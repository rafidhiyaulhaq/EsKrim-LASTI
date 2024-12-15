const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { productId, quantity } = data;

  try {
    const stockRef = db.collection('inventory').doc(productId);
    const stockDoc = await stockRef.get();

    if (!stockDoc.exists || stockDoc.data().quantity < quantity) {
      throw new functions.https.HttpsError('failed-precondition', 'Insufficient stock');
    }

    const orderRef = await db.collection('orders').add({
      productId,
      quantity,
      userId: context.auth.uid,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { orderId: orderRef.id };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});