import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../components/ProductForm";
import { addProduct, updateProduct } from "../store/productSlice";

const CreateOrEditProductPage = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем данные продукта, если редактируем
  const product = useSelector((state) =>
    state.products.list.find((p) => p.id === parseInt(id))
  );

  const handleSubmit = (formData) => {
    if (isEdit) {
      // Редактирование существующего продукта
      dispatch(updateProduct(formData));
      navigate(`/products/${formData.id}`);
    } else {
      // Создание нового продукта
      const newProduct = { ...formData, id: Date.now() }; // Генерация уникального ID
      dispatch(addProduct(newProduct));
      navigate(`/products`);
    }
  };

  return (
    <div>
      <h1>{isEdit ? "Edit Product" : "Create Product"}</h1>
      <ProductForm
        initialData={isEdit ? product : {}}
        onSubmit={handleSubmit}
        buttonText={isEdit ? "Update Product" : "Create Product"}
      />
    </div>
  );
};

export default CreateOrEditProductPage;
