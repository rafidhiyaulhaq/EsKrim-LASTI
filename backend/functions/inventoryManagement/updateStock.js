const admin = require('firebase-admin');
const functions = require('firebase-functions');
const db = admin.firestore();

exports.updateStock = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Requires admin privileges');
  }

  const { productId, quantity, operation } = data;

  try {
    const stockRef = db.collection('inventory').doc(productId);
    
    await db.runTransaction(async (transaction) => {
      const stockDoc = await transaction.get(stockRef);
      const currentStock = stockDoc.data()?.quantity || 0;
      
      const newQuantity = operation === 'add' 
        ? currentStock + quantity 
        : currentStock - quantity;
        
      if (newQuantity < 0) {
        throw new Error('Stock cannot be negative');
      }

      transaction.update(stockRef, { 
        quantity: newQuantity,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});