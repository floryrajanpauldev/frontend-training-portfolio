function ObjectKeysExample() {
  const person = {
    name: 'Jane',
    age: 30,
    city: 'London',
    profession: 'Developer',
  };

  const displayPerson = Object.keys(person).map((key) => (
    <li key={key}>
      {key}: {person[key]}
    </li>
  ));

  return (
    <div>
      <h2>Object.keys()</h2>

      <ul>
        {displayPerson}
      </ul>
    </div>
  );
}

export default ObjectKeysExample;