import React from "react";

import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";
const ProductList = ({ products, onLike, onDelete }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onLike={() => onLike(product.id)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
