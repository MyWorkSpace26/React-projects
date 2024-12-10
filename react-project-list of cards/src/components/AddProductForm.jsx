import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";
import { useNavigate } from "react-router-dom";

function AddProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    x;
    const newProduct = {
      id: Date.now(),
      title,
      description,
      price: parseFloat(price),
      liked: false,
    };
    dispatch(addProduct(newProduct));
    setTitle("");
    setDescription("");
    setPrice("");
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
