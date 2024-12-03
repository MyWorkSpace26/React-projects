import React from "react";
import InputForm from "./LoginForm.jsx";
import imgHero from "./assets/hero-bg.jpg";
import UserTable from "./UsersTable.jsx";
import SinginForm from "./SinginForm.jsx";
function App() {
  return (
    <>
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
        <SinginForm />
      </div>
      <div>
        <UserTable />
      </div>
    </>
  );
}

export default App;
