import { useEffect, useState } from "react";
import axios from "axios";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function Recipes() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=pizza"
        );

        setMeals(response.data.meals);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Chicken Recipes</h1>

      {meals?.map((meal) => (
        <div key={meal.idMeal}>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <h2>{meal.strMeal}</h2>
        </div>
      ))}
    </div>
  );
}

export default Recipes;