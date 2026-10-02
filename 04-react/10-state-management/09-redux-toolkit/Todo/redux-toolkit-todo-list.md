# Redux Toolkit – Todo List Example

## Overview

This example demonstrates how to build a Todo List using **Redux Toolkit**.

The Todo List supports:

* Add Todo
* Edit Todo
* Delete Todo
* Mark Todo as completed/uncompleted

The example demonstrates the complete Redux Toolkit data flow:

```text
Component
   ↓
dispatch(action)
   ↓
Reducer in createSlice
   ↓
Redux Store
   ↓
useSelector()
   ↓
Component re-renders
```

---

## Folder Structure

```text
09-redux-toolkit/
│
├── todoSlice.js
├── store.js
├── TodoList.jsx
├── App.jsx
├── main.jsx
├── App.css
└── redux-toolkit-todo-list.md
```

---

# 1. Install Redux Toolkit

For a new React application, install:

```bash
npm install @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit` provides the Redux Toolkit APIs.

`react-redux` provides the React bindings such as:

* `Provider`
* `useSelector`
* `useDispatch`

---

# 2. Create the Todo Slice

Create:

```text
todoSlice.js
```

We use `createSlice()` to define:

* Slice name
* Initial state
* Reducers
* Actions

```jsx
import { createSlice, nanoid } from "@reduxjs/toolkit";
```

`nanoid()` generates a unique random ID for each todo.

---

# 3. Initial State

The initial state is an array of todo objects.

```jsx
const initialState = [
  {
    id: nanoid(),
    text: "Learn Redux Toolkit",
    completed: false,
  },
  {
    id: nanoid(),
    text: "Practice createSlice",
    completed: false,
  },
];
```

Each todo contains:

| Property    | Purpose                       |
| ----------- | ----------------------------- |
| `id`        | Unique identifier             |
| `text`      | Todo text                     |
| `completed` | Whether the todo is completed |

---

# 4. createSlice()

```jsx
const todoSlice = createSlice({
  name: "todoList",
  initialState,

  reducers: {
    // reducers
  },
});
```

The `name` is the name of the slice.

Important:

The slice `name` is **not** what determines how we access the state.

The state access path is determined by the key we use in the store.

---

# 5. Add Todo

```jsx
addTodo: (state, action) => {
  state.push({
    id: nanoid(),
    text: action.payload,
    completed: false,
  });
}
```

When the component dispatches:

```jsx
dispatch(addTodo("Learn React"));
```

The value `"Learn React"` becomes:

```jsx
action.payload
```

A new todo is then added to the state.

---

# 6. Edit Todo

The edit action receives both the ID and the updated text.

```jsx
dispatch(
  editTodo({
    id: editId,
    text: trimmedValue,
  })
);
```

The reducer receives this object through `action.payload`.

```jsx
editTodo: (state, action) => {
  const { id, text } = action.payload;

  const todo = state.find((todo) => todo.id === id);

  if (todo) {
    todo.text = text;
  }
}
```

First, we find the todo using its ID.

Then we update its text.

The ID remains unchanged.

---

# 7. Delete Todo

The delete action only needs the ID.

```jsx
dispatch(deleteTodo(id));
```

The reducer uses `filter()`:

```jsx
deleteTodo: (state, action) => {
  return state.filter((todo) => todo.id !== action.payload);
}
```

The todo whose ID matches `action.payload` is removed.

---

# 8. Toggle Complete

The checkbox sends the todo ID:

```jsx
dispatch(toggleComplete(id));
```

The reducer finds the todo:

```jsx
const todo = state.find((todo) => todo.id === action.payload);
```

Then toggles the value:

```jsx
todo.completed = !todo.completed;
```

Therefore:

```text
false → true
true  → false
```

We don't need to manually check whether the current value is `true` or `false`.

---

# 9. Export Actions and Reducer

`createSlice()` automatically generates action creators.

```jsx
export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} = todoSlice.actions;
```

The reducer is exported separately:

```jsx
export default todoSlice.reducer;
```

The component imports the actions.

The store imports the reducer.

---

# 10. Configure the Store

Create:

```text
store.js
```

```jsx
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
```

The important part is:

```jsx
reducer: {
  todo: todoReducer,
}
```

The key `todo` determines how we access this state.

Therefore:

```jsx
state.todo
```

will access the todo state.

### Important distinction

```jsx
name: "todoList"
```

and

```jsx
reducer: {
  todo: todoReducer,
}
```

are different things.

| Code                | Purpose                           |
| ------------------- | --------------------------------- |
| `name: "todoList"`  | Slice/action namespace            |
| `todo: todoReducer` | State key used by `useSelector()` |

So if the store contains:

```jsx
reducer: {
  todos: todoReducer,
}
```

we must use:

```jsx
state.todos
```

not:

```jsx
state.todo
```

---

# 11. Provider

In `main.jsx`, wrap the application with Redux's `Provider`.

```jsx
<Provider store={store}>
  <App />
</Provider>
```

The Provider makes the Redux store available to the React component tree.

---

# 12. useSelector()

`useSelector()` is used to **read data from the Redux store**.

```jsx
const todoList = useSelector((state) => state.todo);
```

The flow is:

```text
Redux Store
    ↓
state.todo
    ↓
useSelector()
    ↓
todoList
```

We can then use the data inside the component.

---

# 13. Displaying Todos

The todo array can be displayed using `map()`.

```jsx
{todoList.map((todo) => (
  <li key={todo.id}>
    {todo.text}
  </li>
))}
```

The unique ID is used as the React key:

```jsx
key={todo.id}
```

---

# 14. useDispatch()

`useDispatch()` is used when we want to **send an action to Redux**.

```jsx
const dispatch = useDispatch();
```

Then:

```jsx
dispatch(addTodo(inputValue));
```

The value passed to the action becomes:

```jsx
action.payload
```

---

# 15. Managing the Input

The input itself uses local component state:

```jsx
const [inputValue, setInputValue] = useState("");
```

The input is controlled:

```jsx
<input
  value={inputValue}
  onChange={handleGetInputValue}
/>
```

The change handler gets the input value:

```jsx
const handleGetInputValue = (event) => {
  setInputValue(event.target.value);
};
```

This is an example of using **local state** together with **global Redux state**.

The input value does not need to be stored in Redux.

---

# 16. Add or Update

The same button is used for both operations.

```jsx
if (editId) {
  dispatch(
    editTodo({
      id: editId,
      text: trimmedValue,
    })
  );
} else {
  dispatch(addTodo(trimmedValue));
}
```

The `editId` determines which operation should happen.

### No `editId`

```text
Add Todo
   ↓
dispatch(addTodo())
   ↓
New todo is created
```

### `editId` exists

```text
Update Todo
   ↓
dispatch(editTodo())
   ↓
Existing todo is updated
```

After updating, we clear the edit ID:

```jsx
setEditId(null);
```

---

# 17. Complete Redux Toolkit Flow

For adding a todo:

```text
User types:
"Learn Redux"

       ↓

inputValue

       ↓

Click Add Todo

       ↓

dispatch(addTodo(inputValue))

       ↓

action.payload

       ↓

addTodo reducer

       ↓

state.push(...)

       ↓

Redux state updated

       ↓

useSelector()

       ↓

Component re-renders
```

---

# 18. CRUD Operations

This example demonstrates the basic CRUD-style operations:

| Operation | Redux Toolkit implementation |
| --------- | ---------------------------- |
| Create    | `state.push()`               |
| Read      | `useSelector()`              |
| Update    | `find()` + update property   |
| Delete    | `filter()`                   |

The checkbox adds another operation:

```text
Toggle completed
```

---

# 19. Why Redux Toolkit Is Simpler

With traditional Redux, we generally needed separate files for:

* Action types
* Action creators
* Reducers
* Store
* `combineReducers`

With Redux Toolkit, `createSlice()` combines much of this logic.

For example:

```jsx
const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // logic
    },
    editTodo: (state, action) => {
      // logic
    },
    deleteTodo: (state, action) => {
      // logic
    },
  },
});
```

It automatically creates the corresponding action creators.

---

# 20. Important Redux Toolkit Concept: Immer

Redux traditionally expects state to be treated as immutable.

However, Redux Toolkit allows code such as:

```jsx
state.push(newTodo);
```

or:

```jsx
todo.text = text;
```

This works because Redux Toolkit uses **Immer** internally.

Immer allows us to write simpler "mutating-looking" code while producing the required immutable state updates behind the scenes.

---

# Key Takeaways

The most important concepts from this Todo List example are:

1. `createSlice()` creates reducers and action creators together.
2. `configureStore()` creates the Redux store.
3. The reducer key in `store.js` determines the state path.
4. `useSelector()` reads Redux state.
5. `useDispatch()` dispatches actions.
6. `action.payload` carries data from the component to the reducer.
7. `nanoid()` generates unique IDs.
8. IDs allow us to find, edit, delete, and toggle individual todos.
9. `map()` is used to display the todo list.
10. `find()` can locate a specific todo.
11. `filter()` can remove a todo.
12. `!completed` toggles between completed and incomplete.
13. Redux Toolkit uses Immer, allowing simpler reducer syntax.
14. Local UI state such as the input value can remain in `useState` rather than being placed in Redux.

## The Big Picture

```text
                 Redux Store
                     │
                     ▼
              ┌─────────────┐
              │ todoReducer │
              └──────┬──────┘
                     │
                     ▼
                 todo state
                     │
                     ▼
               useSelector()
                     │
                     ▼
                 TodoList
                     │
          ┌──────────┴──────────┐
          │                     │
    useState()             useDispatch()
          │                     │
    Input value           Redux actions
                                │
             ┌──────────────────┼──────────────────┐
             ▼                  ▼                  ▼
          addTodo            editTodo          deleteTodo
                                                   │
                                             toggleComplete
```

This Todo List gives us a practical understanding of the complete **Redux Toolkit workflow** before moving into more advanced RTK concepts.
