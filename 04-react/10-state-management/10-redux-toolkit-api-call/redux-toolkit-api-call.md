# Redux Toolkit – API Calls with `createAsyncThunk` and `extraReducers`

## Overview

Redux Toolkit provides `createAsyncThunk` to simplify asynchronous operations such as API calls.

When an async thunk is dispatched, Redux Toolkit automatically creates three lifecycle actions:

| Lifecycle   | Meaning                            |
| ----------- | ---------------------------------- |
| `pending`   | API request is in progress         |
| `fulfilled` | API request completed successfully |
| `rejected`  | API request failed                 |

These lifecycle actions can be handled in the slice using `extraReducers`.

The two important concepts work together:

```text
createAsyncThunk
      ↓
Makes the API call
      ↓
pending / fulfilled / rejected
      ↓
extraReducers
      ↓
Updates Redux state
```

---

# 1. Project Setup

Create the project:

```bash
npm create vite@latest redux-toolkit-api-call
```

Select:

```text
React
JavaScript
```

Install the required packages:

```bash
npm install axios @reduxjs/toolkit react-redux
```

---

# 2. Folder Structure

```text
10-redux-toolkit-api-call/
├── formSlice.js
├── store.js
├── Form.jsx
├── App.jsx
├── main.jsx
├── App.css
└── redux-toolkit-api-call.md
```

---

# 3. Redux Toolkit Imports vs React Redux Imports

There are two different packages involved.

### Redux Toolkit

Used for creating the Redux logic:

```jsx
import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
```

### React Redux

Used for connecting React components to Redux:

```jsx
import {
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
```

Remember:

| Package            | Common APIs                                         |
| ------------------ | --------------------------------------------------- |
| `@reduxjs/toolkit` | `createSlice`, `createAsyncThunk`, `configureStore` |
| `react-redux`      | `Provider`, `useSelector`, `useDispatch`            |

---

# 4. Store the Input Value in Redux

Instead of using:

```jsx
const [name, setName] = useState("");
```

we store the value in Redux.

Initial state:

```jsx
const initialState = {
  name: "",
};
```

Create a reducer:

```jsx
setName: (state, action) => {
  state.name = action.payload;
}
```

Redux Toolkit automatically creates the action:

```jsx
export const { setName } = formSlice.actions;
```

The component can then dispatch:

```jsx
dispatch(setName(event.target.value));
```

And read the value:

```jsx
const name = useSelector((state) => state.form.name);
```

---

# 5. Controlled Input Using Redux

The input is controlled by Redux state:

```jsx
<input
  value={name}
  onChange={(event) =>
    dispatch(setName(event.target.value))
  }
/>
```

This is conceptually similar to using `useState`.

With local state:

```jsx
const [name, setName] = useState("");

<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

With Redux:

```jsx
const name = useSelector((state) => state.form.name);

<input
  value={name}
  onChange={(event) =>
    dispatch(setName(event.target.value))
  }
/>
```

The main difference is that Redux is managing the state instead of the component.

---

# 6. `createAsyncThunk`

`createAsyncThunk` is used to create an asynchronous Redux action, commonly for API calls.

Basic syntax:

```jsx
createAsyncThunk(
  "sliceName/actionName",
  async (argument) => {
    // API call
  }
);
```

It accepts:

1. Action type string
2. Async callback
3. Optional configuration object

---

# 7. The Action Type

The first argument follows this pattern:

```text
sliceName/actionName
```

Example:

```jsx
createAsyncThunk(
  "form/fetchProducts",
  async () => {
    // API call
  }
);
```

Here:

```text
form
```

is the slice name.

And:

```text
fetchProducts
```

is the action name.

The slice name comes from:

```jsx
createSlice({
  name: "form",
});
```

The store key is a separate concept.

For example:

```jsx
configureStore({
  reducer: {
    form: formReducer,
  },
});
```

The state path is:

```jsx
state.form
```

But the thunk action type is based on:

```jsx
name: "form"
```

---

# 8. Fetch Products with `createAsyncThunk`

Example:

```jsx
export const fetchProducts = createAsyncThunk(
  "form/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://dummyjson.com/products"
    );

    return response.data;
  }
);
```

The returned value becomes the payload of the `fulfilled` action.

Because the API response contains:

```text
{
  products: [...]
}
```

we can later access:

```jsx
action.payload.products
```

---

# 9. Automatically Generated Lifecycle Actions

When we dispatch:

```jsx
dispatch(fetchProducts());
```

Redux Toolkit automatically handles the lifecycle:

```text
fetchProducts.pending
        ↓
API request
        ↓
   ┌────┴────┐
   ↓         ↓
fulfilled  rejected
```

### Pending

The request has started.

### Fulfilled

The request succeeded.

### Rejected

The request failed.

For example, if the URL is incorrect:

```text
Request failed with status code 404
```

That error can be handled by the `rejected` case.

---

# 10. `extraReducers`

`extraReducers` allows a slice to respond to actions created somewhere else.

This is different from `reducers`.

## `reducers`

Used for actions that we define directly inside our slice:

```jsx
reducers: {
  setName: (state, action) => {
    state.name = action.payload;
  },
}
```

## `extraReducers`

Used to respond to external actions, including the lifecycle actions created by `createAsyncThunk`.

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, ...)
    .addCase(fetchProducts.fulfilled, ...)
    .addCase(fetchProducts.rejected, ...);
}
```

---

# 11. Handling `pending`

```jsx
.addCase(fetchProducts.pending, (state) => {
  state.loading = true;
  state.error = null;
})
```

When the API request starts:

```text
loading = true
```

We can use this in the UI to display:

```text
Loading...
```

---

# 12. Handling `fulfilled`

```jsx
.addCase(fetchProducts.fulfilled, (state, action) => {
  state.loading = false;
  state.options = action.payload.products;
})
```

When the API succeeds:

```text
loading = false
```

and the products are stored in:

```text
options
```

The component can then use:

```jsx
options.map(...)
```

to populate the dropdown.

---

# 13. Handling `rejected`

```jsx
.addCase(fetchProducts.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
```

If the API fails:

```text
loading = false
error = error message
```

For example:

```text
Request failed with status code 404
```

The UI can display the error.

---

# 14. Adding the Selected Option

The selected product ID is also stored in Redux.

Initial state:

```jsx
selectedOption: ""
```

Reducer:

```jsx
setSelectedOption: (state, action) => {
  state.selectedOption = action.payload;
}
```

Export:

```jsx
export const {
  setName,
  setSelectedOption,
} = formSlice.actions;
```

---

# 15. Controlled Select

The dropdown is controlled using Redux:

```jsx
<select
  value={selectedOption}
  onChange={(event) =>
    dispatch(setSelectedOption(event.target.value))
  }
>
```

Each option uses the product ID:

```jsx
<option
  key={product.id}
  value={product.id}
>
  {product.title}
</option>
```

Therefore, if the user selects product 6:

```text
selectedOption = "6"
```

The selected ID can then be sent to the backend during the POST request.

---

# 16. Form Submission

The form uses:

```jsx
<form onSubmit={handleSubmit}>
```

The submit handler prevents the browser's default page reload:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();

  // submit data
};
```

We can access both Redux values:

```jsx
name
selectedOption
```

and dispatch them together:

```jsx
dispatch(
  submitFormData({
    name,
    selectedOption,
  })
);
```

---

# 17. POST API with `createAsyncThunk`

Create another thunk:

```jsx
export const submitFormData = createAsyncThunk(
  "form/submitFormData",
  async ({ name, selectedOption }) => {
    const response = await axios.post(
      "https://dummyjson.com/products/add",
      {
        title: name,
        description: `Selected product ID: ${selectedOption}`,
        userId: 1,
      }
    );

    return response.data;
  }
);
```

The object passed to:

```jsx
dispatch(submitFormData(...))
```

becomes the argument received by the thunk.

---

# 18. Handling the POST Lifecycle

We can create another set of `extraReducers` cases:

```jsx
.addCase(submitFormData.pending, (state) => {
  state.submitting = true;
  state.submitError = null;
})

.addCase(submitFormData.fulfilled, (state, action) => {
  state.submitting = false;
  state.submittedData = action.payload;
})

.addCase(submitFormData.rejected, (state, action) => {
  state.submitting = false;
  state.submitError = action.error.message;
})
```

Notice that the same three lifecycle actions are available:

```text
pending
fulfilled
rejected
```

---

# 19. `loading` vs `submitting`

We can use separate flags for separate operations.

```text
loading
```

can represent:

```text
Fetching products
```

while:

```text
submitting
```

can represent:

```text
Submitting the form
```

This is clearer than trying to use one flag for every API operation.

---

# 20. Preventing Multiple Submissions

We can disable the button while the POST request is running:

```jsx
<button
  type="submit"
  disabled={submitting}
>
  {submitting ? "Submitting..." : "Submit"}
</button>
```

Initially:

```text
submitting = false
```

The button is enabled.

When the request starts:

```text
submitting = true
```

The button becomes disabled.

When the request finishes:

```text
submitting = false
```

The button becomes enabled again.

---

# 21. `condition` in `createAsyncThunk`

`createAsyncThunk` also provides an optional configuration object.

One useful option is:

```jsx
condition
```

Example:

```jsx
export const submitFormData = createAsyncThunk(
  "form/submitFormData",

  async ({ name, selectedOption }) => {
    // API call
  },

  {
    condition: (_, { getState }) => {
      const state = getState();
      const submitting = state.form.submitting;

      if (submitting) {
        return false;
      }

      return true;
    },
  }
);
```

The `condition` runs before the API request.

If it returns:

```jsx
false
```

the thunk will not continue with the API request.

---

# 22. Why Use `condition`?

Suppose the user double-clicks the Submit button.

We don't want two identical API calls.

The condition can check whether a request is already being submitted:

```jsx
const submitting = state.form.submitting;
```

If:

```text
submitting = true
```

return:

```jsx
false
```

and prevent the thunk from running.

---

# 23. Authentication Example

`condition` can also be useful for authentication checks.

For example, imagine Redux contains:

```jsx
state.form.loggedIn
```

Before making a protected API call, we could check:

```jsx
condition: (_, { getState }) => {
  const state = getState();

  if (!state.form.loggedIn) {
    return false;
  }

  return true;
}
```

The idea is:

```text
User starts API operation
        ↓
Check condition
        ↓
Is user logged in?
     ↙       ↘
   Yes        No
    ↓          ↓
API call    Don't call API
```

The application could then handle the authentication situation appropriately.

---

# 24. Axios Headers

Axios allows us to pass configuration along with the request.

Example:

```jsx
const axiosConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
```

Then:

```jsx
axios.get(url, axiosConfig);
```

or:

```jsx
axios.post(url, data, axiosConfig);
```

The exact headers depend on the API.

---

# 25. Authentication Tokens

Some APIs require authentication headers such as:

```text
Authorization
```

The exact implementation depends on the application's authentication architecture and backend requirements.

The important point is that Axios supports passing headers through its request configuration.

---

# 26. Axios Timeout

If an API takes too long to respond, Axios can also be configured with a timeout:

```jsx
const axiosConfig = {
  timeout: 5000,
};
```

This means Axios will stop waiting after the configured period and reject the request.

This is different from a normal loading state.

```text
loading
   ↓
API still waiting
   ↓
timeout reached
   ↓
request rejected
   ↓
error handling
```

---

# 27. API-Specific Parameters

Some API parameters are specific to the API itself.

For example:

```text
expiresInMins
```

may be required by an authentication API.

That is **not an Axios setting**.

It is part of the API contract.

For example, an authentication API may expect:

```text
username
password
expiresInMins
```

The frontend sends those values according to the API documentation.

---

# 28. Important Takeaway

The two most important concepts from this topic are:

### `createAsyncThunk`

Used to create and perform asynchronous operations such as API calls.

```jsx
createAsyncThunk(
  "form/fetchProducts",
  async () => {
    // API call
  }
);
```

### `extraReducers`

Used to respond to the lifecycle actions generated by the thunk:

```jsx
pending
fulfilled
rejected
```

Together:

```text
createAsyncThunk
      ↓
   API call
      ↓
pending / fulfilled / rejected
      ↓
extraReducers
      ↓
Redux state updated
      ↓
React UI updates
```

---

# 29. Final Redux Toolkit API Flow

```text
React Component
      │
      │ dispatch(fetchProducts())
      ↓
createAsyncThunk
      │
      │ Axios GET
      ↓
     API
      │
      ├── Success → fulfilled
      │
      └── Error   → rejected
              │
              ↓
        extraReducers
              │
              ↓
         Redux State
              │
              ↓
          React UI
```

For form submission:

```text
Input + Selected Product
          ↓
       dispatch
          ↓
   submitFormData
          ↓
      Axios POST
          ↓
         API
          ↓
pending / fulfilled / rejected
          ↓
     extraReducers
          ↓
      Redux State
          ↓
        UI update
```

## Key Points to Remember

1. `createAsyncThunk` is used for asynchronous operations such as API calls.
2. `createAsyncThunk` automatically generates `pending`, `fulfilled`, and `rejected` actions.
3. `extraReducers` handles those generated lifecycle actions.
4. `action.payload` contains the value returned from a successful thunk.
5. `action.error.message` can be used to access the error message for a rejected thunk.
6. `condition` can prevent a thunk from executing when a condition is not satisfied.
7. `useSelector` reads Redux state.
8. `useDispatch` dispatches Redux actions and thunks.
9. `loading` and `submitting` can be separate flags for different API operations.
10. Axios supports request configuration such as headers and timeout.
11. API-specific parameters are determined by the API/backend contract.
12. `createAsyncThunk` and `extraReducers` are commonly used together for Redux Toolkit API handling.
