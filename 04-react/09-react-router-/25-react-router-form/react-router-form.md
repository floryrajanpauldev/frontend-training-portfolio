# React Router Form

React Router provides a `<Form>` component that can be used to handle form submissions through React Router's data APIs.

It works together with a route `action` function.

---

## 1. Traditional HTML Form

In traditional HTML/JavaScript applications, a form can use the `action` and `method` attributes:

```html
<form action="example.php" method="post">
    <input type="text" name="username">
    <input type="password" name="password">

    <button type="submit">Login</button>
</form>
```

The browser submits the form data to the URL specified in the `action` attribute.

---

# 2. React Router `<Form>`

React Router provides its own `Form` component.

Import it from React Router:

```jsx
import { Form } from "react-router";
```

Instead of the regular HTML:

```html
<form>
```

we use:

```jsx
<Form>
```

React Router can then intercept the form submission and call the `action` function associated with the current route.

---

# 3. Why Use React Router `<Form>`?

React Router's `<Form>` works with its data APIs.

The basic flow is:

```text
User submits <Form>
        ↓
React Router intercepts submission
        ↓
Route action function executes
        ↓
request.formData()
        ↓
Read form values
        ↓
Call API
        ↓
Process response
        ↓
redirect()
```

This allows us to handle form submissions without manually creating an `onSubmit` handler and manually calling `navigate()`.

---

# 4. Controlled Form vs React Router Form

With a traditional React controlled form, we might have:

```jsx
const [username, setUsername] = useState("");

<input
    value={username}
    onChange={(e) => setUsername(e.target.value)}
/>
```

The React component maintains the input value in state.

For a React Router `<Form>`, we don't need to maintain the form fields in React state just to submit them.

Instead:

```jsx
<input
    type="text"
    name="username"
/>
```

The important part is the `name` attribute.

The `name` is used by `FormData` to identify the submitted value.

---

# 5. Login Form

Example:

```jsx
<Form method="post">

    <input
        type="text"
        name="username"
    />

    <input
        type="password"
        name="password"
    />

    <button type="submit">
        Login
    </button>

</Form>
```

Notice that we don't have:

```jsx
value={username}
```

or:

```jsx
onChange={handleChange}
```

for the purpose of submitting these values.

Instead, we give each input a `name`.

---

# 6. The `name` Attribute Is Important

Consider:

```jsx
<input
    type="text"
    name="username"
/>

<input
    type="password"
    name="password"
/>
```

When the form is submitted, the values are available through `FormData`.

For example, if the user enters:

```text
username: john
password: abc123
```

the submitted form data contains:

```text
username → john
password → abc123
```

We can retrieve these values using:

```js
formData.get("username");
formData.get("password");
```

---

# 7. Route `action`

Just like React Router allows us to define a `loader` for a route, we can also define an `action`.

Example:

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
/>
```

The `action` function handles the form submission.

---

# 8. Creating the Action Function

The action function can be exported from `Login.jsx`.

```jsx
export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    // API call...

}
```

React Router passes an object to the action function.

The object can contain:

```js
{
    request,
    params,
    context
}
```

We can destructure the properties we need:

```js
export async function action({ request }) {
```

---

# 9. Getting Form Data

The `request` object contains the submitted request.

We can call:

```js
const formData = await request.formData();
```

`formData` is a browser `FormData` object.

The `FormData` Web API allows us to work with key/value pairs from a form.

MDN Web Docs:

https://developer.mozilla.org/en-US/docs/Web/API/FormData

---

# 10. Getting Individual Form Values

Use:

```js
formData.get("username");
```

and:

```js
formData.get("password");
```

Example:

```js
const username = formData.get("username");
const password = formData.get("password");
```

We can then create an object:

```js
const formValue = {
    username,
    password
};
```

---

# 11. Calling the Login API

Now that we have the form values, we can pass them to our API function.

```js
const data = await loginUser(formValue);
```

For example:

```js
const formValue = {
    username,
    password
};

const data = await loginUser(formValue);
```

The API might return an access token:

```js
{
    accessToken: "abc123"
}
```

---

# 12. Store the Access Token

After a successful login, we can store the access token in `localStorage`.

```js
localStorage.setItem(
    "accessToken",
    data.accessToken
);
```

Now the browser has the token available for later requests.

---

# 13. Redirect After Login

After successfully logging in, we don't want the user to remain on the login page.

React Router provides:

```js
redirect()
```

Import it:

```jsx
import { redirect } from "react-router";
```

Then:

```js
return redirect("/users");
```

The complete flow becomes:

```text
Login Form
    ↓
Submit
    ↓
Route action
    ↓
request.formData()
    ↓
username + password
    ↓
loginUser()
    ↓
access token
    ↓
localStorage
    ↓
redirect("/users")
```

---

# 14. Complete `action` Function

```jsx
export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    const formValue = {
        username,
        password
    };

    const data = await loginUser(formValue);

    localStorage.setItem(
        "accessToken",
        data.accessToken
    );

    return redirect("/users");
}
```

---

# 15. Connecting the Action to the Route

Import the action using an alias:

```jsx
import Login, {
    action as loginAction
} from "./Login";
```

Then:

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
/>
```

The alias:

```js
action as loginAction
```

is useful because `action` is a generic name.

It makes the route easier to understand:

```jsx
action={loginAction}
```

---

# 16. Complete Example

## Login.jsx

```jsx
import { Form, redirect } from "react-router";
import { loginUser } from "./utils";

export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    const formValue = {
        username,
        password
    };

    const data = await loginUser(formValue);

    localStorage.setItem(
        "accessToken",
        data.accessToken
    );

    return redirect("/users");
}

function Login() {

    return (
        <div>

            <h1>Login</h1>

            <Form method="post">

                <div>
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        name="username"
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                    />
                </div>

                <button type="submit">
                    Login
                </button>

            </Form>

        </div>
    );
}

export default Login;
```

---

# 17. App.jsx

```jsx
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router";

import Login, {
    action as loginAction
} from "./Login";

function Home() {
    return <h1>Home Page</h1>;
}

function Users() {
    return <h1>Users Page</h1>;
}

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                    action={loginAction}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
```

---

# 18. Example API Function

For demonstration purposes, we can create a mock login function.

```jsx
export async function loginUser(formValue) {

    console.log("Login data:", formValue);

    // Simulating an API response
    return {
        accessToken: "sample-access-token"
    };
}
```

In a real application, this function would make an API request.

---

# 19. Traditional React Approach vs React Router Form

### Traditional React Form

```jsx
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        const formValue = {
            username,
            password
        };

        loginUser(formValue);
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button type="submit">
                Login
            </button>

        </form>
    );
}
```

Here React manages:

* input state
* `onChange`
* `onSubmit`
* `preventDefault()`
* API call
* navigation

---

# 20. React Router Form Approach

```jsx
<Form method="post">

    <input
        name="username"
    />

    <input
        name="password"
        type="password"
    />

    <button type="submit">
        Login
    </button>

</Form>
```

The route handles the submission:

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
/>
```

And the action handles the data:

```jsx
export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    // API call

    return redirect("/users");
}
```

---

# 21. Important Interview Point

### Question

**How does React Router handle form submissions?**

### Answer

React Router provides a `<Form>` component that integrates with its data APIs.

When the form is submitted, React Router calls the `action` function associated with the route.

The action can access the submitted values using:

```js
const formData = await request.formData();
```

Then individual values can be retrieved using:

```js
formData.get("username");
```

The action can perform operations such as API calls, save data, and redirect the user.

---

# 22. Important Points to Remember

### `<Form>`

```jsx
import { Form } from "react-router";
```

React Router's form component.

### `method`

```jsx
<Form method="post">
```

Specifies how the form should be submitted.

### `name`

```jsx
<input name="username" />
```

The `name` is used when retrieving the value through `FormData`.

### Route `action`

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
/>
```

Defines the function that handles the submission.

### `request.formData()`

```js
const formData = await request.formData();
```

Retrieves the submitted form data.

### `formData.get()`

```js
formData.get("username");
```

Retrieves an individual form value.

### `redirect()`

```js
return redirect("/users");
```

Redirects the user after the action completes.

---

# 23. Overall Flow

```text
                    Login Page
                        │
                        ▼
                <Form method="post">
                        │
                        │ Submit
                        ▼
               React Router Action
                        │
                        ▼
              request.formData()
                        │
                        ▼
             username + password
                        │
                        ▼
                  loginUser()
                        │
                        ▼
                 Access Token
                        │
                        ▼
                 localStorage
                        │
                        ▼
              redirect("/users")
                        │
                        ▼
                   Users Page
```

---

# 24. Key Takeaway

React Router's `<Form>` allows form submissions to participate in React Router's data-routing model.

Instead of manually managing every form submission with React state and an `onSubmit` handler, we can:

```text
<Form>
    ↓
Route action
    ↓
request.formData()
    ↓
API call
    ↓
redirect()
```

This is especially useful when working with React Router's `loader` and `action` data APIs.
