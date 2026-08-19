import { Link } from "react-router";
import { ROUTES } from "../routes/routePaths";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you requested does not exist.
      </p>

      <Link
        className="button button-primary"
        to={ROUTES.HOME}
      >
        Return Home
      </Link>
    </div>
  );
}

export default NotFoundPage;