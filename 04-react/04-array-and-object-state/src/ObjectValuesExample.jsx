function ObjectValuesExample() {
  const person = {
    name: 'Jane',
    age: 30,
    city: 'London',
    profession: 'Developer',
  };

  const displayValues = Object.values(person).map((value, index) => (
    <li key={index}>
      {value}
    </li>
  ));

  return (
    <div>
      <h2>Object.values()</h2>

      <ul>
        {displayValues}
      </ul>
    </div>
  );
}

export default ObjectValuesExample;