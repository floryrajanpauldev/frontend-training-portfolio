
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Something went wrong</h1>

      <p>
        {error?.message || "An unexpected error occurred."}
      </p>
    </>
  );
}

export default ErrorPage;

