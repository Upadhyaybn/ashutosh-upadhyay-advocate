import {
  useEffect,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

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
                  <dt>{t("about.details.primaryContact")}</dt>
                  <dd>
                    <a href="tel:+919628395566">
                      +91 9628395566
                    </a>
                  </dd>
                </div>

                <div>
                  <dt>{t("about.details.whatsapp")}</dt>
                  <dd>
                    <a
                      href="https://wa.me/919628395566"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +91 9628395566
                    </a>
                  </dd>
                </div>

                <div>
                  <dt>{t("about.details.email")}</dt>
                  <dd>
                    <a href="mailto:ashutoshadvocate24@gmail.com">
                      ashutoshadvocate24@gmail.com
                    </a>
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

            <article className="service-card">

              <h3>
                {t("about.journey.delhi.title")}
              </h3>

              <p>
                {t("about.journey.delhi.description")}
              </p>

            </article>

            <article className="service-card">

              <h3>
                {t("about.journey.lucknow.title")}
              </h3>

              <p>
                {t("about.journey.lucknow.description")}
              </p>

            </article>

            <article className="service-card">

              <h3>
                {t("about.journey.civil.title")}
              </h3>

              <p>
                {t("about.journey.civil.description")}
              </p>

            </article>

            <article className="service-card">

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
        <section className="section">
          <div className="container">
            <p>{t("common.loadingProfile")}</p>
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
