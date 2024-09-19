import Cart from "./components/Carts/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Checkout from "./components/Checkout";

function App() {
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
