const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { items, shippingAddress, paymentMethod } = data;

  try {
    // Validate stock availability
    for (const item of items) {
      const stockDoc = await db.collection('inventory').doc(item.productId).get();
      if (!stockDoc.exists || stockDoc.data().quantity < item.quantity) {
        throw new functions.https.HttpsError('failed-precondition', 
          `Insufficient stock for product ${item.productId}`);
      }
    }

    // Calculate total
    let total = 0;
    for (const item of items) {
      const productDoc = await db.collection('products').doc(item.productId).get();
      total += productDoc.data().price * item.quantity;
    }

    const orderRef = await db.collection('orders').add({
      userId: context.auth.uid,
      items,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { orderId: orderRef.id, total };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});