import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../routes/routePaths";

interface FooterProps {
  onOpenDisclaimer: () => void;
}

function Footer({
  onOpenDisclaimer,
}: FooterProps) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Ashutosh Upadhyay</h3>

          <p>
            {t("common.footer.tagline")}
          </p>
        </div>

        <div>
          <h4>{t("common.footer.quickLinks")}</h4>

          <div className="footer-links">
            <Link to={ROUTES.ABOUT}>
              {t("common.footer.about")}
            </Link>

            <Link to={ROUTES.PRACTICE_AREAS}>
              {t("common.footer.practiceAreas")}
            </Link>

            <Link to={ROUTES.ENQUIRY}>
              {t("common.footer.legalEnquiry")}
            </Link>

            <Link to={ROUTES.APPOINTMENT}>
              {t("common.footer.appointment")}
            </Link>

            <button
              type="button"
              className="footer-link-button"
              onClick={onOpenDisclaimer}
            >
              {t("disclaimer.footerLink")}
            </button>
          </div>
        </div>

        <div>
          <h4>{t("common.footer.office")}</h4>

         <p>
             {t("common.footer.officeLine1")}
         </p>

         <p>
             {t("common.footer.officeLine2")}
         </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {year} Ashutosh Upadhyay Advocate.{" "}
          {t("common.footer.rightsReserved")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
