import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import { useCart } from "../context/CartContext.jsx";
import { currFormatting } from "../util/Formatting.js";
import Input from "./UI/Input.jsx";
import { Button } from "./UI/Button.jsx";
import { useUserProgress } from "../context/UserProgressContext.jsx";

export default function Checkout() {
  const { cartInfo } = useCart();
  const { hideCheckout, progress } = useUserProgress();

  const cartTotal = cartInfo.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartInfo.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currFormatting.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
