const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Import and export all functions
const inventory = require('./inventoryManagement');
const sales = require('./salesMarketing');

module.exports = {
  inventory,
  sales
};