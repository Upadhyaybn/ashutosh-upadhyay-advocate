import { NavLink } from "react-router";
import { ROUTES } from "../../routes/routePaths";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <NavLink to={ROUTES.HOME} className="brand">
          <span className="brand-title">
            Ashutosh Upadhyay
          </span>

          <span className="brand-subtitle">
            Advocate
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to={ROUTES.HOME}>
            Home
          </NavLink>

          <NavLink to={ROUTES.ABOUT}>
            About
          </NavLink>

          <NavLink to={ROUTES.PRACTICE_AREAS}>
            Practice Areas
          </NavLink>

          <NavLink to={ROUTES.CONTACT}>
            Contact
          </NavLink>

          <NavLink
            to={ROUTES.APPOINTMENT}
            className="nav-primary"
          >
            Book Appointment
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;