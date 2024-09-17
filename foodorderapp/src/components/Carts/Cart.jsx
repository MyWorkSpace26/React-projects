import Modal from "../UI/Modal";
import { useCart } from "../../context/CartContext";
import React from "react";
import { currFormatting } from "../../util/Formatting";
import { Button } from "../UI/Button";
import { useUserProgress } from "../../context/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartInfo } = useCart();
  const { progress } = useUserProgress();

  const cartTotal = cartInfo.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your cart</h2>
      <ul>
        {cartInfo.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-totla">{currFormatting.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
