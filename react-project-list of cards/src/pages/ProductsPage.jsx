import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  toggleLike,
  deleteProduct,
} from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import styles from "../styles/ProductsPage.module.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [searchQuery, setSearchQuery] = useState(""); // Поиск по названию
  const [filter, setFilter] = useState("all"); // Фильтр: все или избранное
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Комбинированная фильтрация
  const filteredProducts = products.filter((product) => {
    // Фильтр избранного
    if (filter === "favorites" && !product.liked) return false;

    // Фильтр по названию
    if (!product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;

    return true; // Продукт соответствует всем условиям
  });

  return (
    <div>
      {/* Поисковая строка и кнопки фильтров */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
        <button onClick={() => setFilter("all")}>Показать все</button>
        <button onClick={() => setFilter("favorites")}>
          Показать избранное
        </button>
      </div>

      {/* Отображение списка продуктов */}
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
          <p className={styles.noProductsMessage}>Ничего не найдено.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
