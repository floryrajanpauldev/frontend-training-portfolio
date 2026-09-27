import { Link, Outlet } from "react-router";

function ResourceLayout() {
  return (
    <div>
      <h1>Resources</h1>

      <nav>
        <Link to=".">Resources Home</Link> |{" "}
        <Link to="guides">Guides</Link> |{" "}
        <Link to="articles">Articles</Link> |{" "}
        <Link to="faqs">FAQs</Link>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default ResourceLayout;