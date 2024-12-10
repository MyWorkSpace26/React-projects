import React from "react";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product, onLike }) => {
  return (
    <div className={`${styles.card} ${product.liked ? styles.likedCard : ""}`}>
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
            onClick={onLike}
          >
            ❤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
