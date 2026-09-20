import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

import {
  Link,
} from "react-router";

import {
  ROUTES,
} from "../../routes/routePaths";

function ContactPage() {

  const { t } = useTranslation();

  return (
    <>

      <Seo
        title={t("seo.contact.title")}
        description={t("seo.contact.description")}
        path="/contact"
      />

      <PageHeader
        title={t("seo.contact.title")}
        description={t("contact.pageHeaderDescription")}
      />

      <section className="section">

        <div className="container contact-grid">

          <div className="info-card">

            <p className="eyebrow">
              {t("contact.location.eyebrow")}
            </p>

            <h2>
              {t("contact.location.title")}
            </h2>

            <p>
              {t("contact.location.addressLine1")}
            </p>

            <p>
              {t("contact.location.addressLine2")}
              <br />
              {t("contact.location.addressLine3")}
            </p>

            <p>
              {t("contact.location.description")}
            </p>

          </div>

          <div className="info-card">

            <p className="eyebrow">
              {t("contact.assistance.eyebrow")}
            </p>

            <h2>
              {t("contact.assistance.title")}
            </h2>

            <p>
              {t("contact.assistance.description")}
            </p>

            <div className="stacked-actions">

              <Link
                className="button button-primary"
                to={ROUTES.ENQUIRY}
              >
                {t("contact.assistance.submitEnquiry")}
              </Link>

              <Link
                className="button button-secondary"
                to={ROUTES.APPOINTMENT}
              >
                {t("contact.assistance.requestAppointment")}
              </Link>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default ContactPage;
