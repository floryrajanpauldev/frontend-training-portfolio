
import {
    Form,
    redirect,
    useActionData,
    useNavigation
} from "react-router";

import { loginUser } from "./utils";

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export async function action({ request }) {

    await delay(2000);
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


function Login() {

    const errorMessage = useActionData();

    const navigation = useNavigation();

    console.log("Navigation:", navigation);

    return (
        <div>

            <h1>Login</h1>

            <Form method="post" replace>{/* to skip current route /login from the history */}

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

export default Login;
