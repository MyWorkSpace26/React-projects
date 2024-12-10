import React from "react";

import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";
const ProductList = ({ products, onLike }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLike={() => onLike(product.id)} // Передаем onLike в ProductCard
        />
      ))}
    </div>
  );
};

export default ProductList;
