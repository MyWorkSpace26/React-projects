import React from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ product, onLike, onDelete }) => {
  const navigate = useNavigate(); // Хук для навигации

  // Обработчик клика на карточку
  const handleCardClick = () => {
    navigate(`/products/${product.id}`); // Переход на страницу товара
  };

  // Обработчик клика на кнопку удаления или лайка
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    onLike(); // Логика для лайка
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    onDelete(); // Логика для удаления
  };

  return (
    <div
      className={`${styles.card} ${product.liked ? styles.likedCard : ""}`}
      onClick={handleCardClick} // Навешиваем обработчик на всю карточку
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
            onClick={handleLikeClick} // Лайк не должен останавливать клик на карточке
          >
            ❤
          </button>
          <button
            className={styles.deleteButton}
            onClick={handleDeleteClick} // Удаление не должно останавливать клик на карточке
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
