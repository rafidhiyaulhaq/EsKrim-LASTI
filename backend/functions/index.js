const admin = require('firebase-admin');

// Initialize Firebase Admin tanpa service account untuk local development
admin.initializeApp();

// Import dan export semua functions
const inventory = require('./inventoryManagement');
const sales = require('./salesMarketing');

module.exports = {
  inventory,
  sales
};