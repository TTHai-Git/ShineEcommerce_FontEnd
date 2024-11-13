import React, { createContext, useContext, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart or update quantity if it already exists
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id_product === item.id_product
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id_product === item.id_product
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    alert("Thêm vào giỏ hàng thành công");
  };

  const addToCartWithQuantity = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id_product === item.id_product
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id_product === item.id_product
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: quantity }];
      }
    });
    alert("Thêm vào giỏ hàng thành công");
  };

  const removeItem = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id_product !== id)
    );
  };

  // Increase quantity of a specific item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id_product === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity of a specific item
  const decreaseQuantity = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id_product === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToCartWithQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
