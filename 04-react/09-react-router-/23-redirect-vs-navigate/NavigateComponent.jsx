
import { Navigate } from "react-router";

function Profile() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <h1>Profile</h1>;
}

export default Profile;

