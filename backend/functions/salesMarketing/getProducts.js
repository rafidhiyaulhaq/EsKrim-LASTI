const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.getProducts = functions.https.onCall(async (data, context) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = [];
    
    snapshot.forEach(doc => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return products;
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});