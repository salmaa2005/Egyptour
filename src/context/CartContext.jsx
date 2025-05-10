// src/context/CartContext.jsx
import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("egyptianCraftsCart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const addToCart = (productTitle) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productTitle]: (prevCart[productTitle] || 0) + 1,
    }));
  };

  const increaseQuantity = (productTitle) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productTitle]: (prevCart[productTitle] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productTitle) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[productTitle] || 0;
      if (currentQuantity <= 1) {
        const newCart = { ...prevCart };
        delete newCart[productTitle];
        return newCart;
      }
      return {
        ...prevCart,
        [productTitle]: currentQuantity - 1,
      };
    });
  };

  const removeItem = (productTitle) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productTitle];
      return newCart;
    });
  };

  useEffect(() => {
    localStorage.setItem("egyptianCraftsCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
