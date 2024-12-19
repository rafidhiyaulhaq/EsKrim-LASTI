import React from "react";

const Menu = ({ items, addToCart }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-t-lg object-cover w-full h-32"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-gray-700">Rp. {item.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Stock: {item.stock}</p>
            <button
              className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 
                ${
                  item.stock <= 0
                    ? "opacity-50 cursor-not-allowed bg-gray-400"
                    : "hover:bg-blue-700"
                }`}
              onClick={() => addToCart(item)}
              disabled={item.stock <= 0}
            >
              {item.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
