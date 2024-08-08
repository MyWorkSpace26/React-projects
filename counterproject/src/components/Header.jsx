import React from "react";
import logoImg from "../assets/logo.png";

const Header = () => {
  return (
    <header id="main-header">
      <img src={logoImg} alt="Magnifying glass analyzing a document" />
      <h1>React - Behind The Scenes</h1>
    </header>
  );
};

export default Header;
