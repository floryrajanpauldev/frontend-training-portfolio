# Props and Images

This section covers single-value props, object and array props, parent-to-child data flow, `filter()`, `map()`, unique keys, images, and Flexbox styling.

## Topics

| Topic | Example |
|---|---|
| Single props | `name="John"` and `age={25}` |
| Object props | `details={person}` |
| Array props | Passing people or recipes |
| Destructuring | `function Person({ name, age })` |
| Filtering | London employees and chemists |
| Mapping | People, recipes, and ingredients |
| Keys | Prefer stable IDs from the backend |
| Images | Images in `public/images` |
| Flexbox | Person and recipe cards |

## Unique Keys

Keys help React identify list items and do not appear in the browser output.

Prefer:

```jsx
<li key={person.id}>{person.name}</li>
```

Avoid `key={Math.random()}` because it changes on every render.

An index can be used for a stable, non-changing list such as a poem.

## Images

Public-folder image:

```jsx
<img src="images/peter.png" alt="Peter" />
```

An image inside `src/assets` can be imported:

```jsx
import johnPic from './assets/john.png';

<img src={johnPic} alt="John" />
```

## Setup Later

```bash
npm create vite@latest
npm install
npm run dev
```
