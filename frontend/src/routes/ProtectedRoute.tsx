import {
  Navigate,
  Outlet,
} from "react-router";

import {
  getToken,
} from "../utils/authStorage";

import {
  ROUTES,
} from "./routePaths";

function ProtectedRoute() {

  const token =
    getToken();

  if (!token) {

    return (
      <Navigate
        to={ROUTES.ADMIN_LOGIN}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;