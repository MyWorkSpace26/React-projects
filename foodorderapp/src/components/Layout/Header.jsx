import React from "react";
import logoImg from "../../assets/logo.jpg";
import { Button } from "../UI/Button.jsx";
import { useCart } from "../../context/CartContext";
const Header = () => {
  const { cartInfo } = useCart();
  const countOfMeals = cartInfo.items.length;
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart {countOfMeals}</Button>
      </nav>
    </header>
  );
};

export default Header;
