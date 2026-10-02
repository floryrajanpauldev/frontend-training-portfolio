import Video from './Video.jsx';
import Counter from './Counter.jsx';
import ToggleDisplay from './ToggleDisplay.jsx';

function App() {
  function handlePlay() {
    alert('Playing video');
  }

  return (
    <main>
      <h1>React Events and State</h1>

      <section>
        <h2>Passing a Function to a Child</h2>
        <Video onPlay={handlePlay} />
      </section>

      <section>
        <Counter />
      </section>

      <section>
        <ToggleDisplay />
      </section>
    </main>
  );
}

export default App;
