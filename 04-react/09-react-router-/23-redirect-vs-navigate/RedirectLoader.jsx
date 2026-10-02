
import { redirect } from "react-router";

const authLoader = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return redirect("/");
  }

  return null;
};

export default authLoader;

