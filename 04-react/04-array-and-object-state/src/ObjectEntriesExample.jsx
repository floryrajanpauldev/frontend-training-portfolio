function ObjectEntriesExample() {
  const person = {
    name: 'Jane',
    age: 30,
    city: 'London',
    profession: 'Developer',
  };

  const displayPerson = Object.entries(person).map(
    ([key, value]) => (
      <li key={key}>
        {key}: {value}
      </li>
    )
  );

  return (
    <div>
      <h2>Object.entries()</h2>

      <ul>
        {displayPerson}
      </ul>
    </div>
  );
}

export default ObjectEntriesExample;