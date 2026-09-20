import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

import ContactAction
  from "../../components/common/ContactAction";

import {
  CONTACT_INFO,
  mailtoHref,
  telHref,
  whatsappHref,
} from "../../config/contactInfo";

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

      <section className="section section-muted">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("contact.methods.eyebrow")}
            </p>

            <h2>
              {t("contact.methods.title")}
            </h2>

          </div>

          <div className="card-grid">

            <article className="service-card">

              <h3>
                {t("common.contact.primaryContact")}
              </h3>

              <ContactAction
                type="phone"
                label={t("common.contact.primaryContact")}
                value={CONTACT_INFO.primaryPhoneDisplay}
                href={telHref(CONTACT_INFO.primaryPhoneDigits)}
              />

            </article>

            <article className="service-card">

              <h3>
                {t("common.contact.alternateContact")}
              </h3>

              <ContactAction
                type="phone"
                label={t("common.contact.alternateContact")}
                value={CONTACT_INFO.alternatePhoneDisplay}
                href={telHref(CONTACT_INFO.alternatePhoneDigits)}
              />

            </article>

            <article className="service-card">

              <h3>
                {t("common.contact.whatsapp")}
              </h3>

              <ContactAction
                type="whatsapp"
                label={t("common.contact.whatsapp")}
                value={CONTACT_INFO.whatsappDisplay}
                href={whatsappHref(CONTACT_INFO.whatsappDigits)}
              />

            </article>

            <article className="service-card">

              <h3>
                {t("common.contact.email")}
              </h3>

              <ContactAction
                type="email"
                label={t("common.contact.email")}
                value={CONTACT_INFO.email}
                href={mailtoHref(CONTACT_INFO.email)}
              />

            </article>

          </div>

        </div>

      </section>

    </>
  );
}

export default ContactPage;
