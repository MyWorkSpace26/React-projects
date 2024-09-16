import React, { useState, useContext, createContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      //return { ...state, items: [...state.items, action.item] };
      const updatedItems = [...state.items];
      const exitstingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      if (exitstingCartItemIndex > -1) {
        const exitstingItem = state.items[exitstingCartItemIndex];
        const updatedItem = {
          ...exitstingItem,
          quantity: exitstingItem.quantity + 1,
        };
        updatedItems[exitstingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return {
        ...state,
        items: updatedItems,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
  }
};

export const CartProvider = ({ children }) => {
  const [cartInfo, dispatch] = useReducer(reducer, {
    items: [],
  });

  const handlerAddingMeal = (item) => {
    dispatch({
      type: "ADD_ITEM",
      item,
    });
  };

  const handlerDeletingMeal = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      id,
    });
  };

  return (
    <CartContext.Provider
      value={{ cartInfo, handlerAddingMeal, handlerDeletingMeal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
