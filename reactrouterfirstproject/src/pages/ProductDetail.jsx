import { useParams, useNavigate } from "react-router-dom";

function ProductDetailPage() {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/products");
  };

  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      {/* نفس الرابط يلي حطيتو بعد ال : لازم يكون نفس الاسم */}
      <p>
        <button onClick={navigateHandler}>Go to Home Page</button>
      </p>
    </>
  );
}

export default ProductDetailPage;
