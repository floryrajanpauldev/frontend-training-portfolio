import "./app.css";

function App() {
  return (
    <div className="page">
      <h1 className="page-title">Styled Components</h1>

      <p>
        This paragraph uses normal global CSS.
      </p>

      <a href="https://react.dev">
        React Documentation
      </a>

      <button className="local-button">
        Local Button
      </button>
    </div>
  );
}

export default App;