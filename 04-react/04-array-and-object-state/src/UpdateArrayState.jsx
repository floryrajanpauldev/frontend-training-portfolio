import { useState } from 'react';

function UpdateArrayState() {
  const fruitList = ['Apple', 'Grapes', 'Orange'];
  const [fruits, setFruits] = useState(fruitList);

  function handleAddFruit(newFruit) {
    setFruits((previousFruits) => [
      ...previousFruits,
      newFruit,
    ]);
  }

  return (
    <div>
      <h2>Updating Array Using useState()</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
      <button onClick={() => handleAddFruit('Sweet Lime')}>Add Sweet Lime</button>
      <button onClick={() => handleAddFruit('Watermelon')}>Add Watermelon</button>
    </div>
  );
}

export default UpdateArrayState;
