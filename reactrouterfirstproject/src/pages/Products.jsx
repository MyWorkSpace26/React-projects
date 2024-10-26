import React from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <h1>This is a Products Page</h1>
      </div>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
};

export default ProductsPage;
