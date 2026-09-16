import { useState } from 'react';

function PizzaRecipe() {
  const ingredientsList = [];
  const [ingredients, setIngredients] = useState(ingredientsList);

  function handleAddIngredient(newIngredient) {
    setIngredients((previousIngredients) => [
      ...previousIngredients,
      newIngredient,
    ]);
  }

  return (
    <div>
      <h2>Pizza Recipe</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <button onClick={() => handleAddIngredient('Pizza Dough')}>Add Pizza Dough</button>
      <button onClick={() => handleAddIngredient('Tomato Sauce')}>Add Tomato Sauce</button>
      <button onClick={() => handleAddIngredient('Mozzarella Cheese')}>Add Mozzarella Cheese</button>
      <button onClick={() => handleAddIngredient('Onion')}>Add Onion</button>
      <button onClick={() => handleAddIngredient('Bell Pepper')}>Add Bell Pepper</button>
      <button onClick={() => handleAddIngredient('Olives')}>Add Olives</button>
    </div>
  );
}

export default PizzaRecipe;
