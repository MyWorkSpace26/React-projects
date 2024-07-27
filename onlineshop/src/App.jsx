import { useState } from "react";

import Header from "./components/Header";
import Shop from "./components/Shop";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import { useShoppingCart } from "./store/Shopping-cart-context.jsx";

function App() {
  const { shoppingCart } = useShoppingCart();

  return (
    <>
      <Header cart={shoppingCart} />
      <Shop />
    </>
  );
}

export default App;
