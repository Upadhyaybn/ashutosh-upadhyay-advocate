import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router";

import {
  ROUTES,
} from "../routes/routePaths";

import {
  removeToken,
} from "../utils/authStorage";

function AdminLayout() {

  const navigate =
    useNavigate();

  const handleLogout = () => {

    removeToken();

    navigate(
      ROUTES.ADMIN_LOGIN,
      {
        replace: true,
      }
    );
  };

  return (
    <div className="admin-shell">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          Advocate Admin
        </div>

        <nav>

          <NavLink
            end
            to={ROUTES.ADMIN_DASHBOARD}
          >
            Dashboard
          </NavLink>

          <NavLink
            to={ROUTES.ADMIN_ENQUIRIES}
          >
            Enquiries
          </NavLink>

          <NavLink
            to={ROUTES.ADMIN_APPOINTMENTS}
          >
            Appointments
          </NavLink>

          <NavLink
            to={ROUTES.ADMIN_PROFILE}
          >
            Profile
          </NavLink>

          <NavLink
            to={ROUTES.ADMIN_PRACTICE_AREAS}
          >
            Practice Areas
          </NavLink>

          <NavLink
            to={ROUTES.ADMIN_AUDIT_LOGS}
          >
            Audit Logs
          </NavLink>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </nav>

      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;