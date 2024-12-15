const { createOrder } = require('./createOrder');
const { getProducts } = require('./getProducts');
const { processPayment } = require('./processPayment');

module.exports = {
  createOrder,
  getProducts,
  processPayment
};