import React, { useState, useContext, createContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const addCart = "ADD_ITEM";
const deleteCart = "REMOVE_ITEM";
const clearCartData = "CLEAR_CART";

const reducer = (state, action) => {
  const updatedItems = [...state.items];
  switch (action.type) {
    case addCart:
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
    case deleteCart:
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems };
    case clearCartData:
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartInfo, dispatch] = useReducer(reducer, {
    items: [],
  });

  const handlerAddingMeal = (item) => {
    dispatch({
      type: addCart,
      item,
    });
  };

  const handlerDeletingMeal = (id) => {
    dispatch({
      type: deleteCart,
      id,
    });
  };
  const clearCartInfo = () => {
    dispatch({ type: clearCartData });
  };

  return (
    <CartContext.Provider
      value={{
        cartInfo,
        handlerAddingMeal,
        handlerDeletingMeal,
        clearCartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
