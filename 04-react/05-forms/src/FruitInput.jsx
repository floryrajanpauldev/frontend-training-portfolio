import { useState } from 'react';

function FruitInput() {
  const [fruitInput, setFruitInput] = useState('');
  const [fruits, setFruits] = useState(['Apple', 'Grapes', 'Orange']);

  function handleInput(event) {
    setFruitInput(event.target.value);
  }

  function handleAddFruit() {
    if (fruitInput.trim() === '') return;

    setFruits((previousFruits) => [...previousFruits, fruitInput]);
    setFruitInput('');
  }

  return (
    <div>
      <h2>Controlled Input with Array State</h2>
      <label htmlFor="fruit">Fruit:</label>
      <input
        id="fruit"
        name="fruit"
        value={fruitInput}
        onChange={handleInput}
        placeholder="Enter a fruit"
      />
      <button type="button" onClick={handleAddFruit}>Add Fruit</button>

      <ul>
        {fruits.map((fruit) => <li key={fruit}>{fruit}</li>)}
      </ul>
    </div>
  );
}

export default FruitInput;
