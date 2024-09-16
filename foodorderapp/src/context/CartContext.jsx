import React, { useState, useContext, createContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState({
    items: [],
    totalAmount: 0,
  });

  const handlerGetMeal = (mealInfo) => {
    setCartInfo((prevstate) => {
      return {
        items: [...prevstate.items, mealInfo],
        totalAmount: prevstate.totalAmount + 1,
      };
    });
  };

  return (
    <CartContext.Provider value={{ cartInfo, setCartInfo, handlerGetMeal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
