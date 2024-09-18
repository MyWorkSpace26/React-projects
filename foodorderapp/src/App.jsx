import Cart from "./components/Carts/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Checkout from "./components/Checkout";
import { useCart } from "./context/CartContext";
function App() {
  const { cartInfo } = useCart();

  console.log(cartInfo);
  return (
    <>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
