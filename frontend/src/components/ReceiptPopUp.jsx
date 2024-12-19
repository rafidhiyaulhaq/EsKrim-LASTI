import React from "react";

const ReceiptPopUp = ({ receipt, onClose }) => {
  const getFormattedDate = (date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = getFormattedDate(receipt.date);

  const printReceipt = () => {
    const printContent = `
      <html>
        <head>
          <title>Receipt</title>
          <style>
            @page {
              margin: 0;
              size: 80mm 297mm;
            }
            body {
              font-family: 'Courier New', monospace;
              padding: 10mm;
              margin: 0;
              width: 80mm;
              font-size: 12px;
              line-height: 1.4;
            }
            .header {
              text-align: center;
              margin-bottom: 15px;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .store-name {
              font-size: 16px;
              font-weight: bold;
              margin: 0;
            }
            .store-info {
              font-size: 11px;
              margin: 3px 0;
            }
            .receipt-info {
              margin: 10px 0;
              font-size: 11px;
            }
            .receipt-info div {
              display: flex;
              justify-content: space-between;
            }
            .items {
              border-top: 1px dashed #000;
              border-bottom: 1px dashed #000;
              padding: 10px 0;
              margin: 10px 0;
            }
            .item {
              display: flex;
              flex-direction: column;
              margin-bottom: 8px;
            }
            .item-name {
              font-weight: bold;
            }
            .item-details {
              display: flex;
              justify-content: space-between;
              padding-left: 15px;
            }
            .totals {
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
            .total-line {
              display: flex;
              justify-content: space-between;
            }
            .grand-total {
              font-weight: bold;
              font-size: 14px;
              border-top: 1px dashed #000;
              padding-top: 5px;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <p class="store-name">ICE CREAM STORE</p>
            <p class="store-info">Jl. Example Street No. 123</p>
            <p class="store-info">Tel: (021) 123-4567</p>
          </div>

          <div class="receipt-info">
            <div>
              <span>Date: ${date}</span>
              <span>Time: ${time}</span>
            </div>
            <div>
              <span>Receipt #: ${Math.random()
                .toString(36)
                .substr(2, 9)
                .toUpperCase()}</span>
            </div>
            <div>
              <span>Cashier: ADMIN</span>
            </div>
          </div>

          <div class="items">
            ${receipt.items
              .map(
                (item) => `
              <div class="item">
                <span class="item-name">${item.name}</span>
                <div class="item-details">
                  <span>${item.quantity} x ${item.price.toLocaleString()}</span>
                  <span>Rp ${(
                    item.price * item.quantity
                  ).toLocaleString()}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="totals">
            <div class="total-line">
              <span>Subtotal</span>
              <span>Rp ${receipt.total.toLocaleString()}</span>
            </div>
            <div class="total-line">
              <span>Tax (0%)</span>
              <span>Rp 0</span>
            </div>
            <div class="total-line grand-total">
              <span>TOTAL</span>
              <span>Rp ${receipt.total.toLocaleString()}</span>
            </div>
            <div class="total-line">
              <span>Cash</span>
              <span>Rp ${receipt.cash.toLocaleString()}</span>
            </div>
            <div class="total-line">
              <span>Change</span>
              <span>Rp ${receipt.change.toLocaleString()}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>Please come again</p>
            <p>-- Keep this receipt for any returns --</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full mx-4">
        {/* Preview version with similar styling to printed receipt */}
        <div className="text-center border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-bold">ICE CREAM STORE</h2>
          <p className="text-sm text-gray-600">Jl. Example Street No. 123</p>
          <p className="text-sm text-gray-600">Tel: (021) 123-4567</p>
        </div>

        <div className="text-sm space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Date: {date}</span>
            <span>Time: {time}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Receipt #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>
          <div>
            <span>Cashier: ADMIN</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-4 space-y-2">
          {receipt.items.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="font-bold">{item.name}</div>
              <div className="flex justify-between text-sm pl-4">
                <span>
                  {item.quantity} x {item.price.toLocaleString()}
                </span>
                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {receipt.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (0%)</span>
            <span>Rp 0</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
            <span>TOTAL</span>
            <span>Rp {receipt.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Cash</span>
            <span>Rp {receipt.cash.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Change</span>
            <span>Rp {receipt.change.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          <p>Thank you for your purchase!</p>
          <p>Please come again</p>
          <p className="text-xs mt-2">
            -- Keep this receipt for any returns --
          </p>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={printReceipt}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPopUp;
