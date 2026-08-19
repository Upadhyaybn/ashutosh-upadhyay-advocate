import { NavLink, Outlet } from "react-router";
import { ROUTES } from "../routes/routePaths";

function AdminLayout() {
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
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;