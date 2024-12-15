const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.getStock = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const snapshot = await db.collection('inventory').get();
    const stock = {};
    
    snapshot.forEach(doc => {
      stock[doc.id] = doc.data();
    });

    return stock;
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});