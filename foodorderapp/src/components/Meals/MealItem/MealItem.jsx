import React from "react";

const MealItem = ({ name, price, description }) => {
  return (
    <li>
      <div>
        <h3>{name}</h3>
        <div>{description}</div>
        <div>{price}</div>
      </div>
    </li>
  );
};

export default MealItem;
