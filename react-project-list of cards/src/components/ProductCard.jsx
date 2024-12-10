import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product, onLike, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`${styles.card} ${product.liked ? styles.likedCard : ""}`}
      onClick={handleCardClick}
    >
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          <button
            className={`${styles.likeButton} ${
              product.liked ? styles.liked : ""
            }`}
            onClick={handleLikeClick}
          >
            ❤
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteClick}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
