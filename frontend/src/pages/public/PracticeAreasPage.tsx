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
  getPracticeAreas,
} from "../../api/publicApi";

import {
  practiceAreas as localPracticeAreas,
} from "../../data/practiceAreas";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  PracticeArea,
} from "../../types/api";

function PracticeAreasPage() {

  const { t } = useTranslation();

  const [areas, setAreas] =
    useState<PracticeArea[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const load = async () => {

      try {

        setAreas(
          await getPracticeAreas()
        );

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

  const hasBackendAreas =
    !loading &&
    !error &&
    areas.length > 0;

  return (
    <>

      <Seo
        title={t("seo.practiceAreas.title")}
        description={t("seo.practiceAreas.description")}
        path="/practice-areas"
      />

      <PageHeader
        title={t("practiceAreasPage.pageHeaderTitle")}
        description={t("practiceAreasPage.pageHeaderDescription")}
      />

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("practiceAreasPage.intro.eyebrow")}
            </p>

            <h2>
              {t("practiceAreasPage.intro.title")}
            </h2>

            <p>
              {t("practiceAreasPage.intro.paragraph1")}
            </p>

            <p>
              {t("practiceAreasPage.intro.paragraph2")}
            </p>

          </div>

          {loading && (
            <p>
              {t("practiceAreasPage.loading")}
            </p>
          )}

          {error && (
            <div className="admin-info-panel">
              {t("practiceAreasPage.loadError")}
            </div>
          )}

          <div className="card-grid">

            {hasBackendAreas
              ? areas.map((area) => (

                  <article
                    key={area.id}
                    className="service-card"
                  >

                    <h2>
                      {area.name}
                    </h2>

                    <p>
                      {
                        area.shortDescription ||
                        area.detailedDescription ||
                        t("practiceAreasPage.fallbackDescription")
                      }
                    </p>

                  </article>

                ))
              : localPracticeAreas.map(
                  (area) => (

                    <article
                      key={area.id}
                      className="service-card"
                    >

                      <h2>
                        {t(
                          `practiceAreaItems.${area.id}.title`,
                          { defaultValue: area.title }
                        )}
                      </h2>

                      <p>
                        {t(
                          `practiceAreaItems.${area.id}.description`,
                          { defaultValue: area.description }
                        )}
                      </p>

                    </article>

                  )
                )}

          </div>

        </div>

      </section>

      <section className="section section-muted">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("practiceAreasPage.note.eyebrow")}
            </p>

            <h2>
              {t("practiceAreasPage.note.title")}
            </h2>

            <p>
              {t("practiceAreasPage.note.description")}
            </p>

          </div>

        </div>

      </section>

    </>
  );
}

export default PracticeAreasPage;
