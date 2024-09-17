import Cart from "./components/Carts/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useCart } from "./context/CartContext";
function App() {
  const { cartInfo } = useCart();

  console.log(cartInfo);
  return (
    <>
      <Header />
      <Meals />
      <Cart />
    </>
  );
}

export default App;
