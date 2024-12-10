import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";
import styles from "../styles/CreateProductPage.module.css";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rate" || name === "count") {
      setProduct({
        ...product,
        rating: { ...product.rating, [name]: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.title) newErrors.title = "Title is required";
    if (
      !product.price ||
      isNaN(product.price) ||
      parseFloat(product.price) <= 0
    )
      newErrors.price = "Price must be a positive number";
    if (!product.description) newErrors.description = "Description is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.image) newErrors.image = "Image URL is required";
    if (
      !product.rating.rate ||
      isNaN(product.rating.rate) ||
      parseFloat(product.rating.rate) < 0 ||
      parseFloat(product.rating.rate) > 5
    )
      newErrors.rate = "Rate must be a number between 0 and 5";
    if (
      !product.rating.count ||
      isNaN(product.rating.count) ||
      parseInt(product.rating.count) < 0
    )
      newErrors.count = "Count must be a non-negative integer";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Создаем продукт с уникальным id
    const newProduct = {
      ...product,
      price: parseFloat(product.price).toFixed(2), // Преобразуем price
      rating: {
        rate: parseFloat(product.rating.rate),
        count: parseInt(product.rating.count),
      },
      id: Date.now(),
    };

    // Добавляем продукт в store
    dispatch(addProduct(newProduct));

    // Перенаправляем на страницу продуктов
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min={2}
          />
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
          {errors.category && (
            <span className={styles.error}>{errors.category}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rate">Rating from 1 to 5</label>
          <input
            type="number"
            id="rate"
            name="rate"
            step="0.1"
            value={product.rating.rate}
            onChange={handleChange}
            required
            max={5}
            min={1}
          />
          {errors.rate && <span className={styles.error}>{errors.rate}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="count">Reviews</label>
          <input
            type="number"
            id="count"
            name="count"
            value={product.rating.count}
            onChange={handleChange}
            required
          />
          {errors.count && <span className={styles.error}>{errors.count}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
