import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  toggleLike,
  deleteProduct,
} from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import styles from "../styles/ProductsPage.module.css"; // Подключение CSS

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const filteredProducts =
    filter === "favorites"
      ? products.filter((product) => product.liked)
      : products;

  return (
    <div>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <button onClick={() => setFilter("all")}>Показать все</button>
        <button onClick={() => setFilter("favorites")}>
          Показать избранное
        </button>
      </div>
      <div className={styles.gridContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={() => dispatch(toggleLike(product.id))}
              onDelete={() => dispatch(deleteProduct(product.id))}
            />
          ))
        ) : (
          <p className={styles.noProductsMessage}>
            В избранном пока ничего нет.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
