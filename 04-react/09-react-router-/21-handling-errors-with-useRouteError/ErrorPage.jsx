
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Technical Difficulties</h1>

      <p>Something went wrong while loading the recipes.</p>

      <p>Status: {error.status}</p>

      <p>{error.data}</p>
    </>
  );
}

export default ErrorPage;

