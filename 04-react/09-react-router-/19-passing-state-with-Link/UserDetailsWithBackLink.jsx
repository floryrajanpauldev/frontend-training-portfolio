
import {
  Link,
  useLocation,
  useParams
} from "react-router";

function UserDetailsWithBackLink() {
  const { id } = useParams();

  const location = useLocation();

  const backLink =
    location?.state?.searchFilter || "";

  const username =
    location?.state?.username || "";

  const isUsername =
    location.state?.searchFilter?.includes("username")
      ? username
      : "User List";

  return (
    <div>
      <h1>User Details</h1>

      <p>User ID: {id}</p>

      <Link
        to={`..${backLink}`}
        relative="path"
      >
        Back to {isUsername}
      </Link>
    </div>
  );
}

export default UserDetailsWithBackLink;

