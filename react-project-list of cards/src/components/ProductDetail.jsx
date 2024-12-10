import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === parseInt(id))
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => navigate("/products")}>Back to Products</button>
    </div>
  );
}

export default ProductDetail;
