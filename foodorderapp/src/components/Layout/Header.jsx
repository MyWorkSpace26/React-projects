import React from "react";
import logoImg from "../../assets/logo.jpg";
import { Button } from "../UI/Button.jsx";
import { useCart } from "../../context/CartContext";
import { useUserProgress } from "../../context/UserProgressContext.jsx";
const Header = () => {
  const { cartInfo } = useCart();
  const { showCart } = useUserProgress();
  const countOfMeals = cartInfo.items.reduce((totllNumberOfItems, item) => {
    return totllNumberOfItems + item.quantity;
  }, 0);

  function handleStartShowCrat() {
    showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleStartShowCrat}>
          Cart {countOfMeals}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
