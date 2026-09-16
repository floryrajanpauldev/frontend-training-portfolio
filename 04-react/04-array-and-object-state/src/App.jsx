import UpdateArrayState from './UpdateArrayState.jsx';
import PizzaRecipe from './PizzaRecipe.jsx';
import UpdateObjectState from './UpdateObjectState.jsx';
import UpdateUsers from './UpdateUsers.jsx';

function App() {
  return (
    <main>
      <h1>React Array and Object State</h1>
      <section><UpdateArrayState /></section>
      <section><PizzaRecipe /></section>
      <section><UpdateObjectState /></section>
      <section><UpdateUsers /></section>
    </main>
  );
}

export default App;
