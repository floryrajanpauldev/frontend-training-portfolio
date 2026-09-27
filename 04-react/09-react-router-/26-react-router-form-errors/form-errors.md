# useActionData – Handling Form Errors

In the previous topic, we learned how to use React Router's `<Form>` component together with a route `action`.

The action can:

* Read form data
* Call an API
* Store data
* Redirect the user

But what happens when the API returns an error?

For example, suppose the user enters incorrect username and password.

The API might return:

```text
Invalid credentials
```

We don't necessarily want to navigate the user to a separate error page.

Instead, we want to display the error **on the Login page itself**.

React Router provides a hook called:

```jsx
useActionData()
```

---

# 1. The Scenario

The user is on the Login page:

```text
Login Page
-----------------------
Username: [__________]

Password: [__________]

        [ Login ]
```

The user enters incorrect credentials.

The API returns:

```text
Invalid credentials
```

We want the Login page to become:

```text
Login Page
-----------------------
Username: [__________]

Password: [__________]

Invalid credentials

        [ Login ]
```

We don't want to navigate to a separate error page.

---

# 2. `errorElement` vs `useActionData`

React Router provides `errorElement` for handling route-level errors.

For example:

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
    errorElement={<ErrorPage />}
/>
```

If an error is thrown from the route's loader or action and is not handled, React Router can render the `errorElement`.

However, invalid login credentials are an expected form-submission error.

We may want to keep the user on the Login page and display the error there.

For that scenario, we can return error information from the action and access it using `useActionData()`.

---

# 3. Import `useActionData`

Import it from React Router:

```jsx
import { useActionData } from "react-router";
```

Example:

```jsx
function Login() {

    const errorMessage = useActionData();

}
```

---

# 4. What Does `useActionData()` Do?

`useActionData()` gives the component access to the data returned by the route's `action`.

For example, if the action returns:

```js
return error.message
```

then:

```jsx
const errorMessage = useActionData();
```

will give us:

```js
error.message
```

---

# 5. Returning Error Data from the Action

Our action can handle the API error using `try...catch`.

```jsx
export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    const formValue = {
        username,
        password
    };

    try {

        const data = await loginUser(formValue);

        localStorage.setItem(
            "accessToken",
            data.accessToken
        );

        return redirect("/users");

    } catch (error) {

        console.log(error);

        return error.message;
    }
}
```

The important part is:

```js
catch (error) {
    return error.message;
}
```

Instead of throwing the error to React Router's error boundary, we return an object containing the error message.

---

# 6. Accessing the Error in the Login Component

Inside the Login component:

```jsx
const errorMessage = useActionData();
```

---

# 7. Displaying the Error

We can conditionally display the message:

```jsx
{errorMessage && (
    <div className="redColor">
        {errorMessage}
    </div>
)}
```

If:

```js
errorMessage
```

contains:

```text
Invalid credentials
```

the message is displayed.

If it is `undefined`, nothing is displayed.

---

# 8. Complete Action

```jsx
export async function action({ request }) {

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    const formValue = {
        username,
        password
    };

    try {

        const data = await loginUser(formValue);

        localStorage.setItem(
            "accessToken",
            data.accessToken
        );

        return redirect("/users");

    } catch (error) {

        console.log(error);

        return error.message;
    }
}
```

---

# 9. Complete Login Component

```jsx
function Login() {

    const errorMessage = useActionData();


    return (
        <div>

            <h1>Login</h1>

            <Form method="post">

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

                <button type="submit">
                    Login
                </button>

            </Form>

        </div>
    );
}
```

---

# 10. Complete Flow

```text
User enters username/password
            ↓
        <Form>
            ↓
       Form submitted
            ↓
       Route action()
            ↓
       request.formData()
            ↓
       loginUser()
            ↓
      ┌───────────────┐
      │               │
   SUCCESS          ERROR
      │               │
      ↓               ↓
 Store token     catch(error)
      │               │
      ↓               ↓
 redirect()       return 
      │             error.message
      ↓           
   /users              ↓
                  useActionData()
                       ↓
                  Login page
                       ↓
              Display error
```

---

# 11. Successful Login

If the credentials are correct:

```js
const data = await loginUser(formValue);

localStorage.setItem(
    "accessToken",
    data.accessToken
);

return redirect("/users");
```

The user is redirected to:

```text
/users
```

---

# 12. Failed Login

If the credentials are incorrect:

```js
catch (error) {

    return {
        message: error.message
    };
}
```

The user remains on:

```text
/login
```

and the Login component receives the returned data through:

```jsx
useActionData()
```

Then the error is displayed:

```jsx
{errorMessage && (
    <div className="redColor">
        {errorMessage}
    </div>
)}
```

---

# 13. `useLoaderData()` vs `useActionData()`

These hooks are related but serve different purposes.

| Hook              | Gets data from |
| ----------------- | -------------- |
| `useLoaderData()` | Route `loader` |
| `useActionData()` | Route `action` |

Example loader:

```jsx
export async function loader() {
    return users;
}
```

Access it with:

```jsx
const users = useLoaderData();
```

Example action:

```jsx
export async function action() {
    return  error.message
}
```

Access it with:

```jsx
const actionData = useActionData();
```

---

# 14. Why Not Use `errorElement`?

`errorElement` is useful when we want React Router's error boundary behavior.

For example:

```jsx
<Route
    path="/login"
    element={<Login />}
    action={loginAction}
    errorElement={<ErrorPage />}
/>
```

But for a known form error such as:

```text
Invalid credentials
```

we may want to keep the user on the same form.

Therefore:

```text
Expected form error
        ↓
return error data
        ↓
useActionData()
        ↓
Display on same page
```

Whereas an unhandled route error can be handled by:

```text
Route error
    ↓
errorElement
```

---

# 15. Important Interview Point

### Question

**How can you display an error returned by a React Router action on the same page?**

### Answer

We can catch the error inside the route action and return an object containing the error information.

For example:

```js
catch (error) {
    return error.message
```

Then the component can use React Router's `useActionData()` hook:

```jsx
const errorMessage = useActionData();



---

# 16. Key Takeaway

`useActionData()` allows a component to access the data returned by its route's `action`.

For form validation or expected API errors, we can use:

```text
<Form>
   ↓
action()
   ↓
try/catch
   ↓
return error.message
   ↓
useActionData()
   ↓
Display message on same page
```

This is different from throwing an error and allowing React Router's `errorElement` to handle it.
