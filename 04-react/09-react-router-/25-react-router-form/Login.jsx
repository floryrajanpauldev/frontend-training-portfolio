
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

    console.log("Form value:", formValue);

    const data = await loginUser(formValue);

    console.log("API response:", data);

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

                <button type="submit">
                    Login
                </button>

            </Form>
        </div>
    );
}

export default Login;

