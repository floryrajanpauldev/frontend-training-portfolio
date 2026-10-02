import Employee from './Employee.jsx';
import { employees } from './data/employees.js';
function App() {
  const heading = 'React Fundamentals';
  const trainingTopic = 'JSX, components, expressions, and lists';

  // const employees = [
  //   { id: 1, name: 'Anita', role: 'Frontend Developer', department: 'Engineering' },
  //   { id: 2, name: 'Brian', role: 'UI Developer', department: 'Design' },
  //   { id: 3, name: 'Chandra', role: 'React Developer', department: 'Engineering' },
  // ];

  return (
    <>
      <header>
        <h1>{heading}</h1>
        <p>{trainingTopic}</p>
      </header>

      <main>
        <section>
          <h2>Employee List</h2>
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                <strong>{employee.name}</strong>
                <span> — {employee.role}</span>
                <small> ({employee.department})</small>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Employee Component</h2>
          <ul>
            <Employee />
          </ul>
        </section>

        <section>
          <h2>JSX Notes</h2>
          <p className="highlight">
            JSX uses JavaScript expressions inside curly braces.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
