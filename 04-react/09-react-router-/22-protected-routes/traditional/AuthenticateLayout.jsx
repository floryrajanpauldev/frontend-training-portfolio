import { Outlet, Navigate } from "react-router";

function AuthenticateLayout() {
// In a real application, make an API call
// or check the authentication/session state here.
const isLoggedIn = false;

if (!isLoggedIn) {
return <Navigate to="/login" />;
}

return <Outlet />;
}

export default AuthenticateLayout;
