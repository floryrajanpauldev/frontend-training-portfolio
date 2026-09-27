import { redirect } from "react-router";

export async function requireAuth() {
// In a real application, make an API call
// or check the authentication/session state here.
const isLoggedIn = false;

if (!isLoggedIn) {
throw redirect("/login");
}
}
