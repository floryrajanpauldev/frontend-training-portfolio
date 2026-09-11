import Person from './Person.jsx';
import People from './People.jsx';
import Recipes from './Recipes.jsx';

function App() {
  const people = [
    { id: 1, name: 'Peter', city: 'New York', age: 30, image: 'images/peter.png' },
    { id: 2, name: 'John', city: 'London', age: 28, image: 'images/john.png' },
    { id: 3, name: 'Mary', city: 'London', age: 35, image: 'images/mary.png' },
  ];

  const employees = [
    { id: 1, name: 'Anita', city: 'London', profession: 'Developer' },
    { id: 2, name: 'Brian', city: 'Paris', profession: 'Chemist' },
    { id: 3, name: 'Chandra', city: 'London', profession: 'Designer' },
    { id: 4, name: 'David', city: 'London', profession: 'Chemist' },
  ];

  const recipes = [
    {
      id: 'greek-salad',
      name: 'Greek Salad',
      image: 'images/greek-salad.jpg',
      ingredients: ['tomatoes', 'cucumber', 'onions', 'olives', 'feta'],
    },
    {
      id: 'pasta',
      name: 'Pasta',
      image: 'images/pasta.jpg',
      ingredients: ['pasta', 'tomato sauce', 'garlic', 'olive oil'],
    },
  ];

  const londonEmployees = employees.filter((employee) => employee.city === 'London');
  const chemists = employees.filter((employee) => employee.profession === 'Chemist');

  return (
    <>
      <section>
        <h2>Single-Value Props</h2>
        <Person name="John" age={25} />
      </section>

      <section>
        <h2>Object Props and Images</h2>
        <div className="people-list">
          {people.map((person) => (
            <Person key={person.id} details={person} />
          ))}
        </div>
      </section>

      <section>
        <h2>London Employees</h2>
        <People people={londonEmployees} />
      </section>

      <section>
        <h2>Chemists</h2>
        <People people={chemists} />
      </section>

      <section>
        <h2>Recipes</h2>
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <Recipes
              key={recipe.id}
              name={recipe.name}
              image={recipe.image}
              ingredients={recipe.ingredients}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
