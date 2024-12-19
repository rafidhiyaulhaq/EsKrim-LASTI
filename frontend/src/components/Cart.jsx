import React, { useState } from "react";
import ReceiptPopUp from "./ReceiptPopUp";
import { Trash2 } from "lucide-react";

const Cart = ({ cart, setCart, onUpdateQuantity, onClearCart }) => {
  const [cash, setCash] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handleCashInput = (e) => {
    setCash(Number(e.target.value));
  };

  const handleQuickCash = (amount) => {
    setCash((prevCash) => prevCash + amount);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateChange = () => {
    return cash - calculateTotal();
  };

  const isInsufficientCash = () => {
    return cash === 0 || cash < calculateTotal();
  };

  const handleSubmit = () => {
    const totalAmount = calculateTotal();
    if (cash < totalAmount) {
      alert("Cash is not enough to complete the purchase!");
      return;
    }

    const receipt = {
      date: new Date().toLocaleString(),
      items: cart,
      total: totalAmount,
      cash,
      change: calculateChange(),
    };

    setReceiptData(receipt);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setCart([]);
    setCash(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">Cart</h2>
        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your Cart is Empty</p>
      ) : (
        <>
          <div className="mb-4">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border-b py-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="font-bold text-gray-700">{item.name}</p>
                  <p className="text-gray-500">
                    Rp. {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-3 py-1 text-lg font-bold text-gray-600 border rounded-md hover:bg-gray-200"
                    onClick={() => onUpdateQuantity(item.name, "decrease")}
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-3 py-1 text-lg font-bold text-gray-600 border rounded-md hover:bg-gray-200"
                    onClick={() => onUpdateQuantity(item.name, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">TOTAL</span>
              <span className="font-bold text-gray-700">
                Rp. {calculateTotal().toLocaleString()}
              </span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-600">CASH</label>
              <div className="flex items-center mt-2">
                <span className="text-gray-600">Rp</span>
                <input
                  type="number"
                  value={cash}
                  onChange={handleCashInput}
                  className="flex-1 border px-2 py-1 ml-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[2000, 5000, 10000, 20000, 50000, 100000].map((amount) => (
                  <button
                    key={amount}
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm font-medium"
                    onClick={() => handleQuickCash(amount)}
                  >
                    +{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`mt-4 p-2 rounded text-center ${
                isInsufficientCash()
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              CHANGE: Rp. {calculateChange().toLocaleString()}
            </div>
            <button
              className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
                cash < calculateTotal() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={cash < calculateTotal()}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </>
      )}
      {showReceipt && (
        <ReceiptPopUp receipt={receiptData} onClose={handleCloseReceipt} />
      )}
    </div>
  );
};

export default Cart;
