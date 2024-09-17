import { useState, useContext, createContext } from "react";

export const UserProgressContext = createContext({
  progress: "", // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressContextProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  return (
    <UserProgressContext.Provider
      value={{
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};
