import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { currFormatting } from "../../../util/Formatting";
import { Button } from "../../UI/Button";
const MealItem = ({ meal }) => {
  const { handlerGetMeal } = useCart();

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currFormatting.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button
            onClick={() => {
              handlerGetMeal(meal);
            }}
          >
            Add to Cart
          </Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
