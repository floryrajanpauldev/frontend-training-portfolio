# React Fundamentals

This folder contains independently recreated React training examples covering Vite setup, JSX, components, fragments, expressions, conditional rendering, lists, and props.

## Setup Later

When the new laptop is ready:

```bash
npm create vite@latest
npm install
npm run dev
```

Choose React with JavaScript + JSX.

## Project Structure

| File | Purpose |
|---|---|
| `index.html` | Contains the root element |
| `src/main.jsx` | Creates the React root and renders `App` |
| `src/App.jsx` | Main component |
| `src/Employee.jsx` | Reusable employee component |
| `src/data/employees.js` | Employee data |

## Topics Covered

| Topic | Example |
|---|---|
| Root element | `<div id="root"></div>` |
| `createRoot` | Mounting React |
| JSX | HTML-like syntax in JavaScript |
| Fragments | `<>...</>` |
| Expressions | `{heading}` |
| Components | `App` and `Employee` |
| Attributes | `className` |
| Events | `onClick` |
| Conditional rendering | Ternary expression |
| Lists | `employees.map(...)` |
| Keys | `key={employee.id}` |

## Current Scope\n\nThis section covers JSX, components, fragments, expressions, dynamic values, and rendering arrays with `map()`. Props and state will be covered in later sections.\n\n## Important Notes

- JSX elements must be closed.
- Multiple JSX elements need one parent or Fragment.
- JavaScript expressions go inside `{}`.
- React event names use camelCase.
- Use `className` instead of `class`.
- Component names begin with uppercase letters.
- Use stable keys when rendering lists.
- Vite normally creates `package.json` automatically.
