function Recipes({ name, image, ingredients }) {
  return (
    <article className="recipe-card">
      <img src={image} alt={name} className="recipe-image" />
      <h3>{name}</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={`${name}-${ingredient}`}>{ingredient}</li>
        ))}
      </ul>
    </article>
  );
}

export default Recipes;
