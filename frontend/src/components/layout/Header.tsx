import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

import { ROUTES } from "../../routes/routePaths";
import LanguageSwitcher from "../common/LanguageSwitcher";

function Header() {
  const { t } = useTranslation();

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
            {t("common.nav.home")}
          </NavLink>

          <NavLink to={ROUTES.ABOUT}>
            {t("common.nav.about")}
          </NavLink>

          <NavLink to={ROUTES.PRACTICE_AREAS}>
            {t("common.nav.practiceAreas")}
          </NavLink>

          <NavLink to={ROUTES.CONTACT}>
            {t("common.nav.contact")}
          </NavLink>

          <NavLink
            to={ROUTES.APPOINTMENT}
            className="nav-primary"
          >
            {t("common.nav.bookAppointment")}
          </NavLink>

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

export default Header;
