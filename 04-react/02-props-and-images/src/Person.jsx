function Person({ name, age, details }) {
  if (details) {
    const { name, age, city, image } = details;

    return (
      <article className="person-card">
        <img src={image} alt={name} />
        <div className="person-info">
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>City: {city}</p>
        </div>
      </article>
    );
  }

  return <p>This is {name} and his age is {age}.</p>;
}

export default Person;
