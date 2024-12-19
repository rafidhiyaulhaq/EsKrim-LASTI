import React, { useState } from "react";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

const App = () => {
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([
    {
      name: "Strawberry",
      price: 45000,
      image: "/src/assets/strawberry_ice_cream.png",
      stock: 10,
    },
    {
      name: "Chocolatte",
      price: 32000,
      image: "/src/assets/chocolatte_ice_cream.png",
      stock: 15,
    },
    {
      name: "Vanilla",
      price: 30000,
      image: "src/assets/vanilla_ice_cream.png",
      stock: 20,
    },
    {
      name: "Matcha",
      price: 16000,
      image: "/src/assets/matcha_ice_cream.png",
      stock: 8,
    },
    {
      name: "Cookies n Cream",
      price: 20000,
      image: "/src/assets/cookiesncream_ice_cream.png",
      stock: 12,
    },
    {
      name: "Mint Choco",
      price: 10000,
      image: "/src/assets/mintchoco_ice_cream.png",
      stock: 5,
    },
    {
      name: "Mango",
      price: 10000,
      image: "/src/assets/mango_ice_cream.png",
      stock: 7,
    },
  ]);

  const addToCart = (selectedItem) => {
    // Check if there's enough stock
    const item = inventory.find((i) => i.name === selectedItem.name);
    if (item.stock <= 0) {
      return;
    }

    // Update inventory
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name === selectedItem.name
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );

    // Update cart
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.name === selectedItem.name
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.name === selectedItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...selectedItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemName, action) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.name === itemName) {
            const newQuantity =
              action === "increase" ? item.quantity + 1 : item.quantity - 1;

            // Check stock availability when increasing quantity
            if (action === "increase") {
              const inventoryItem = inventory.find((i) => i.name === itemName);
              if (inventoryItem.stock <= 0) {
                return item;
              }
            }

            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean);

      // Update inventory based on quantity change
      setInventory((prevInventory) =>
        prevInventory.map((item) => {
          if (item.name === itemName) {
            const stockChange = action === "increase" ? -1 : 1;
            return { ...item, stock: item.stock + stockChange };
          }
          return item;
        })
      );

      return updatedCart;
    });
  };

  const handleCloseReceipt = () => {
    setCart([]);
  };

  const handleClearCart = () => {
    // Restore stock for all items in cart
    setInventory((prevInventory) => {
      const updatedInventory = [...prevInventory];
      cart.forEach((cartItem) => {
        const itemIndex = updatedInventory.findIndex(
          (item) => item.name === cartItem.name
        );
        if (itemIndex !== -1) {
          updatedInventory[itemIndex].stock += cartItem.quantity;
        }
      });
      return updatedInventory;
    });

    // Clear the cart
    setCart([]);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 h-screen">
      <div className="col-span-2">
        <Menu items={inventory} addToCart={addToCart} />
      </div>
      <div>
        <Cart
          cart={cart}
          setCart={setCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCloseReceipt={handleCloseReceipt}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};

export default App;
