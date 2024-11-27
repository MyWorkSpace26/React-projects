import React from "react";
import InputForm from "./InputForm";
import imgHero from "./assets/hero-bg.jpg";

function App() {
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
      <InputForm />
    </div>
  );
}

export default App;
