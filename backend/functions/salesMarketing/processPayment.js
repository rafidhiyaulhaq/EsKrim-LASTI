const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.processPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { orderId, paymentDetails } = data;

  try {
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Order not found');
    }

    if (orderDoc.data().userId !== context.auth.uid) {
      throw new functions.https.HttpsError('permission-denied', 'Not authorized to process this order');
    }

    await orderRef.update({
      status: 'paid',
      paymentDetails,
      paidAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update inventory
    const orderData = orderDoc.data();
    for (const item of orderData.items) {
      const stockRef = db.collection('inventory').doc(item.productId);
      await stockRef.update({
        quantity: admin.firestore.FieldValue.increment(-item.quantity)
      });
    }

    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});