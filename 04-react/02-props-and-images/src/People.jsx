function People({ people }) {
  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          {person.name} — {person.profession} — {person.city}
        </li>
      ))}
    </ul>
  );
}

export default People;
