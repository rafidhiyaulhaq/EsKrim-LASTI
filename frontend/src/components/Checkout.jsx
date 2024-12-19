import React from "react";

const Checkout = ({ cart, total, cash, change, onClose, onPrint }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Receipt</h2>
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rp. {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between">
              <span>Total</span>
              <span>Rp. {total}</span>
            </div>
            <div className="flex justify-between">
              <span>Cash</span>
              <span>Rp. {cash}</span>
            </div>
            <div className="flex justify-between">
              <span>Change</span>
              <span>Rp. {change}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right space-x-2">
          <button
            onClick={onPrint}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
