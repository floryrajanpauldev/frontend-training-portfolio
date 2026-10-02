# Form `replace` and `useNavigation`

In the previous topics, we learned how to use React Router `<Form>`, route `action`, and `useActionData()`.

In this topic, we will learn two additional features:

* `<Form replace>`
* `useNavigation()`

These are especially useful for a Login form.

---

# 1. The Login Scenario

Suppose the user is on the Login page:

```text
/login
```

They enter their username and password and click Login.

The form submits:

```text
Login
   ↓
action()
   ↓
API call
   ↓
Successful login
   ↓
redirect("/users")
```

The user arrives at:

```text
/users
```

Now suppose they click the browser Back button.

Without replacing the Login history entry, the browser may take them back to the Login page.

For a successful login flow, we may want to prevent the submitted Login page from remaining in the browser history.

React Router provides the `replace` prop on `<Form>` for this.

---

# 2. `<Form replace>`

We can add `replace` to the React Router `<Form>`:

```jsx
<Form method="post" replace>
```

Example:

```jsx
<Form method="post" replace>

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

The `replace` prop tells React Router to replace the current history entry rather than adding another entry.

---

# 3. Without `replace`

Suppose the browser history looks like:

```text
Home
  ↓
Login
  ↓
Users
```

After successful login, the Login page remains in the history.

If the user clicks Back:

```text
Users
  ↓
Login
```

The user can return to the Login page.

---

# 4. With `replace`

When we use:

```jsx
<Form method="post" replace>
```

React Router replaces the current history entry during the navigation.

Conceptually, the Login entry is not kept as a separate history entry for that submission.

The user can therefore avoid returning to the submitted Login state simply by clicking Back.

---

# 5. `replace` with `useNavigate`

Earlier, we learned that `useNavigate()` can also replace a history entry.

Example:

```jsx
navigate("/users", {
    replace: true
});
```

For a React Router `<Form>`, we can use:

```jsx
<Form
    method="post"
    replace
>
```

So the concepts are similar:

| Navigation approach | Replace current history entry |
| ------------------- | ----------------------------- |
| `useNavigate()`     | `{ replace: true }`           |
| `<Form>`            | `replace`                     |

---

# 6. Why Use `useNavigation()`?

When a user clicks Login, the API request may take some time.

During that time, we don't want the user to repeatedly click the Login button.

For example:

```text
Login
Login
Login
Login
```

This could result in multiple form submissions.

React Router provides:

```jsx
useNavigation()
```

to give us information about the current navigation state.

---

# 7. Import `useNavigation`

Import it from React Router:

```jsx
import { useNavigation } from "react-router";
```

Inside the component:

```jsx
const navigation = useNavigation();
```

We can inspect it:

```jsx
console.log(navigation);
```

The navigation object provides information such as:

```text
state
location
formData
formAction
formMethod
```

---

# 8. Navigation State

The most commonly used property is:

```js
navigation.state
```

React Router can report three states:

```text
idle
submitting
loading
```

---

# 9. `idle`

`idle` means there is no navigation or submission currently in progress.

For example, when the Login page is initially displayed:

```js
navigation.state === "idle"
```

---

# 10. `submitting`

When the user submits a form, React Router changes the navigation state to:

```text
submitting
```

For example:

```jsx
<Form method="post">
```

When the user clicks Login:

```text
idle
   ↓
submitting
```

This is useful for showing that the form is currently being submitted.

---

# 11. `loading`

After an action completes, React Router may enter the:

```text
loading
```

state while loading the next route or its data.

For example:

```text
Form submission
      ↓
submitting
      ↓
action completes
      ↓
redirect("/users")
      ↓
loading
      ↓
Users page
      ↓
idle
```

The exact transition depends on what the action does and whether navigation/data loading occurs.

---

# 12. Disable the Login Button

We can use the `submitting` state to disable the Login button.

```jsx
<button
    disabled={navigation.state === "submitting"}
>
    Login
</button>
```

When the form is being submitted:

```js
navigation.state === "submitting"
```

becomes `true`.

Therefore:

```jsx
disabled={true}
```

and the button is disabled.

---

# 13. Change the Button Text

We can also change the button text while the form is submitting.

```jsx
<button
    disabled={navigation.state === "submitting"}
>
    {navigation.state === "submitting"
        ? "Logging in..."
        : "Login"
    }
</button>
```

The user sees:

```text
Login
```

before submitting.

After clicking:

```text
Logging in...
```

The button is also disabled.

---

# 14. Complete Example

```jsx
function Login() {

    const navigation = useNavigation();

    const errorMessage = useActionData();

    return (
        <div>

            <h1>Login</h1>

            <Form method="post" replace>

                <div>
                    <label htmlFor="username">
                        Username:
                    </label>

                    <input
                        id="username"
                        type="text"
                        name="username"
                    />
                </div>

                <br />

                <div>
                    <label htmlFor="password">
                        Password:
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                    />
                </div>

                <br />

                {errorMessage && (
                    <div className="redColor">
                        {errorMessage}
                    </div>
                )}

                <br />

                <button
                    type="submit"
                    disabled={
                        navigation.state === "submitting"
                    }
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Login"
                    }
                </button>

            </Form>

        </div>
    );
}
```

---

# 15. Complete Login Flow

Now our Login form has three important React Router features:

```text
<Form>
    │
    ├── replace
    │
    ▼
Route action
    │
    ├── Success
    │      ↓
    │   localStorage
    │      ↓
    │   redirect("/users")
    │
    └── Error
           ↓
      return error.message
           ↓
      useActionData()
           ↓
      Display error
```

At the same time:

```text
useNavigation()
       ↓
navigation.state
       ↓
submitting
       ↓
Disable Login button
       ↓
"Logging in..."
```

---

# 16. `useNavigate` vs `redirect` vs `useNavigation`

These three are easy to confuse.

### `useNavigate()`

`useNavigate()` is a hook used inside a React component.

Example:

```jsx
const navigate = useNavigate();

navigate("/users");
```

It is useful when navigation needs to happen because of something in a component.

---

### `redirect()`

`redirect()` is a React Router utility commonly used inside data-router functions such as:

* `loader`
* `action`

Example:

```js
return redirect("/users");
```

In our Login action, after a successful API call:

```js
localStorage.setItem(
    "accessToken",
    data.accessToken
);

return redirect("/users");
```

---

### `useNavigation()`

`useNavigation()` does not perform navigation.

Instead, it **provides information about the current navigation state**.

```jsx
const navigation = useNavigation();

console.log(navigation);
```

We can use:

```jsx
navigation.state
```

to determine whether React Router is:

```text
idle
submitting
loading
```

---

# 17. Quick Comparison

| Feature           | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `useNavigate()`   | Programmatically navigate from a component               |
| `redirect()`      | Redirect from a loader/action                            |
| `useNavigation()` | Get information about the current navigation             |
| `<Form replace>`  | Replace the current history entry during form navigation |

---

# 18. Important Interview Point

### Question

**How can you prevent a user from submitting a React Router form multiple times?**

### Answer

We can use `useNavigation()` to check whether the form is currently submitting.

```jsx
const navigation = useNavigation();
```

Then disable the button:

```jsx
<button
    disabled={navigation.state === "submitting"}
>
    {navigation.state === "submitting"
        ? "Logging in..."
        : "Login"
    }
</button>
```

This provides feedback to the user and prevents additional clicks while the form submission is in progress.

---

# 19. Key Takeaways

### `<Form replace>`

```jsx
<Form method="post" replace>
```

Used when we want the form navigation to replace the current history entry instead of adding another one.

### `useNavigation()`

```jsx
const navigation = useNavigation();
```

Provides information about the current navigation.

### Navigation states

```text
idle
submitting
loading
```

### Disable button

```jsx
disabled={navigation.state === "submitting"}
```

### Change button text

```jsx
{navigation.state === "submitting"
    ? "Logging in..."
    : "Login"
}
```

### Overall idea

```text
<Form replace>
       +
useNavigation()
       ↓
Better Login experience
       ↓
Replace history entry
       +
Show submission status
       +
Prevent duplicate submissions
```
