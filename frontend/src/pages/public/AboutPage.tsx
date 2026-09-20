import {
  useEffect,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

import ContactAction
  from "../../components/common/ContactAction";

import Skeleton
  from "../../components/common/Skeleton";

import {
  CONTACT_INFO,
  mailtoHref,
  telHref,
  whatsappHref,
} from "../../config/contactInfo";

import {
  getProfile,
} from "../../api/publicApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  AdvocateProfile,
} from "../../types/api";

function AboutPage() {

  const { t } = useTranslation();

  const [profile, setProfile] =
    useState<AdvocateProfile | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const load = async () => {

      try {

        const response =
          await getProfile();

        setProfile(response);

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setLoading(false);
      }
    };

    void load();

  }, []);

  return (
    <>

      <Seo
        title={t("seo.about.title")}
        description={t("seo.about.description")}
        path="/about"
      />

      <PageHeader
        title={t("seo.about.title")}
        description={t("about.pageHeaderDescription")}
      />

      <section className="section">

        <div className="container">

          <div className="content-grid">

            <div>

              <p className="eyebrow">
                {t("about.profile.eyebrow")}
              </p>

              <h2>
                {t("about.profile.title")}
              </h2>

              <p>
                {t("about.profile.paragraph1")}
              </p>

              <p>
                {t("about.profile.paragraph2")}
              </p>

            </div>

            <aside className="info-card">

              <h3>
                {t("about.details.title")}
              </h3>

              <dl>

                <div>
                  <dt>{t("about.details.association")}</dt>
                  <dd>
                    {t("about.details.associationValue")}
                  </dd>
                </div>

                <div>
                  <dt>{t("about.details.regNo")}</dt>
                  <dd>
                    UP01425/16
                  </dd>
                </div>

                <div>
                  <dt>{t("about.details.cop")}</dt>
                  <dd>
                    R1-164510
                  </dd>
                </div>

                <div>
                  <dt>{t("common.contact.primaryContact")}</dt>
                  <dd>
                    <ContactAction
                      type="phone"
                      label={t("common.contact.primaryContact")}
                      value={CONTACT_INFO.primaryPhoneDisplay}
                      href={telHref(CONTACT_INFO.primaryPhoneDigits)}
                    />
                  </dd>
                </div>

                <div>
                  <dt>{t("common.contact.whatsapp")}</dt>
                  <dd>
                    <ContactAction
                      type="whatsapp"
                      label={t("common.contact.whatsapp")}
                      value={CONTACT_INFO.whatsappDisplay}
                      href={whatsappHref(CONTACT_INFO.whatsappDigits)}
                    />
                  </dd>
                </div>

                <div>
                  <dt>{t("common.contact.email")}</dt>
                  <dd>
                    <ContactAction
                      type="email"
                      label={t("common.contact.email")}
                      value={CONTACT_INFO.email}
                      href={mailtoHref(CONTACT_INFO.email)}
                    />
                  </dd>
                </div>

              </dl>

            </aside>

          </div>

        </div>

      </section>

      <section className="section section-muted">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("about.journey.eyebrow")}
            </p>

            <h2>
              {t("about.journey.title")}
            </h2>

          </div>

          <div className="card-grid">

            <article className="service-card journey-card">

              <span
                className="journey-card-number"
                aria-hidden="true"
              >
                01
              </span>

              <h3>
                {t("about.journey.delhi.title")}
              </h3>

              <p>
                {t("about.journey.delhi.description")}
              </p>

            </article>

            <article className="service-card journey-card">

              <span
                className="journey-card-number"
                aria-hidden="true"
              >
                02
              </span>

              <h3>
                {t("about.journey.lucknow.title")}
              </h3>

              <p>
                {t("about.journey.lucknow.description")}
              </p>

            </article>

            <article className="service-card journey-card">

              <span
                className="journey-card-number"
                aria-hidden="true"
              >
                03
              </span>

              <h3>
                {t("about.journey.civil.title")}
              </h3>

              <p>
                {t("about.journey.civil.description")}
              </p>

            </article>

            <article className="service-card journey-card">

              <span
                className="journey-card-number"
                aria-hidden="true"
              >
                04
              </span>

              <h3>
                {t("about.journey.criminal.title")}
              </h3>

              <p>
                {t("about.journey.criminal.description")}
              </p>

            </article>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("about.approach.eyebrow")}
            </p>

            <h2>
              {t("about.approach.title")}
            </h2>

            <p>
              {t("about.approach.description")}
            </p>

          </div>

        </div>

      </section>

      {loading && (
        <section
          className="section section-muted"
          role="status"
        >
          <div className="container">
            <span className="visually-hidden">
              {t("common.loadingProfile")}
            </span>
            <div className="section-heading">
              <Skeleton className="skeleton-eyebrow" />
              <Skeleton className="skeleton-heading" />
              <Skeleton className="skeleton-text" />
              <Skeleton className="skeleton-text" />
              <Skeleton className="skeleton-text" />
            </div>
          </div>
        </section>
      )}

      {error && (
        <section className="section">
          <div className="container">
            <div className="admin-info-panel">
              {error}
            </div>
          </div>
        </section>
      )}

      {!loading &&
        !error &&
        profile?.professionalBio && (

          <section className="section section-muted">

            <div className="container">

              <div className="section-heading">

                <p className="eyebrow">
                  {t("about.currentProfile.eyebrow")}
                </p>

                <h2>
                  {
                    profile.fullName ||
                    "Ashutosh Upadhyay"
                  }
                </h2>

                <p>
                  {
                    profile.professionalBio
                  }
                </p>

              </div>

            </div>

          </section>

        )}

    </>
  );
}

export default AboutPage;
