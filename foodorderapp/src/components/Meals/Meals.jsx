import React from "react";
import { useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
const Meals = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function fetchMaels() {
      const response = await fetch("http://localhost:3000/meals");
      const dataMeals = await response.json();
      setMeals(dataMeals);
    }
    fetchMaels();
  }, []);
  return (
    <ul id="meals">
      {meals.map((meal) => {
        return (
          <li key={meal.id}>
            <div>
              <h3>{meal.name}</h3>
              <div>{meal.description}</div>
              <div>{meal.price}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Meals;
