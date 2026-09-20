import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
} from "react-router";

import { useTranslation } from "react-i18next";

import { ROUTES } from "../../routes/routePaths";
import LanguageSwitcher from "../common/LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [
    menuTrackedPathname,
    setMenuTrackedPathname,
  ] = useState(location.pathname);

  if (
    location.pathname !==
    menuTrackedPathname
  ) {
    setMenuTrackedPathname(
      location.pathname
    );
    setIsMenuOpen(false);
  }

  useEffect(() => {

    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.classList.add(
      "nav-open"
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.classList.remove(
        "nav-open"
      );
    };

  }, [isMenuOpen]);

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

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={
            isMenuOpen
              ? t("common.nav.closeMenu")
              : t("common.nav.openMenu")
          }
          onClick={() =>
            setIsMenuOpen((open) => !open)
          }
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        {isMenuOpen && (
          <div
            className="nav-backdrop"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <nav
          id="main-navigation"
          className={
            isMenuOpen
              ? "main-nav is-open"
              : "main-nav"
          }
          aria-label="Main navigation"
        >
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
