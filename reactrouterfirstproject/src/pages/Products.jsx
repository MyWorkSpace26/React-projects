import React from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const PRODUCTS = [
    { id: "p1", title: "Product 1" },
    { id: "p2", title: "Product 2" },
    { id: "p3", title: "Product 3" },
  ];

  return (
    <>
      <div>
        <h1>This is a Products Page</h1>
      </div>

      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
