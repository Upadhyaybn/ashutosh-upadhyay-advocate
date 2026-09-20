import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../routes/routePaths";

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1>404</h1>

      <h2>{t("notFound.title")}</h2>

      <p>
        {t("notFound.description")}
      </p>

      <Link
        className="button button-primary"
        to={ROUTES.HOME}
      >
        {t("notFound.returnHome")}
      </Link>
    </div>
  );
}

export default NotFoundPage;
