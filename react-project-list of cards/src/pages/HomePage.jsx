import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Добро пожаловать в Список Продуктов</h1>
        <p className={styles.subtitle}>
          Откройте для себя наши удивительные продукты
        </p>
      </header>
      <main className={styles.main}>
        <Link to="/products" className={styles.ctaButton}>
          View All Products
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
