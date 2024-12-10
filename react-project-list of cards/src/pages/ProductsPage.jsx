import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  toggleLike,
  deleteProduct,
} from "../store/productSlice";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <ProductList
        products={products}
        onLike={(id) => dispatch(toggleLike(id))}
        onDelete={(id) => dispatch(deleteProduct(id))}
      />
    </div>
  );
};

export default ProductsPage;
