import React from "react";
import LogInForm from "../components/login/LogInForm";
import imgHero from "../assets/hero-bg.jpg";
const LogInFormPage = () => {
  return (
    <div
      style={{
        display: "flex", // Значения должны быть строками
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        padding: "0 10px",
        background: `url(${imgHero}) center/cover no-repeat, #000`, // Используем шаблонные строки
      }}
    >
      <LogInForm />
    </div>
  );
};

export default LogInFormPage;
