import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProgressContextProvider } from "./context/UserProgressContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProgressContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProgressContextProvider>
);
