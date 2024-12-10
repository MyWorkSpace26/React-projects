import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../styles/ProductDetailPage.module.css";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.list.find((prod) => prod.id === parseInt(id))
  );

  const handleCardClick = () => {
    navigate(`/products`);
  };

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price}</p>
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.description}</p>
          <ul style={{ listStyleType: "none", padding: "0" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Category:</strong> {product.category}
            </li>
            <li>
              <strong>Rating:</strong> {product.rating.rate} (based on{" "}
              {product.rating.count} reviews)
            </li>
          </ul>
        </div>
        <button
          className={styles.handleCardClickButton}
          onClick={handleCardClick}
        >
          Вернуться к списку товаров
        </button>
        <button
          className={styles.handleCardClickButton}
          onClick={() => navigate(`/products/${product.id}/edit`)}
          style={{ marginLeft: "10px" }}
        >
          Редактировать продукт
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
