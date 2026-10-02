
import { Link } from "react-router";

function Home() {
  return (
    <>
      <h1>Home Page</h1>

      <p>Welcome to the Home page.</p>

      <Link to="/login">Users</Link>
    </>
  );
}

export default Home;
