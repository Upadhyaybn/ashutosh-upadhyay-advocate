import {
  useEffect,
  useState,
} from "react";

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
        title="Legal Practice Areas in Siddharthnagar"
        description="Explore legal services by Advocate Ashutosh Upadhyay in Siddharthnagar and Naugarh for civil, criminal, POCSO, matrimonial, NDPS, NI Act, revenue, MACT and government authority matters."
        path="/practice-areas"
      />

      <PageHeader
        title="Legal Practice Areas"
        description="Legal consultation, case preparation and representation for civil, criminal, family, revenue and statutory matters in Siddharthnagar and Naugarh."
      />

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Legal Services
            </p>

            <h2>
              Advocate &amp; Lawyer
              Practice Areas in Siddharthnagar
            </h2>

            <p>
              Advocate Ashutosh Upadhyay provides
              legal consultation, case preparation
              and representation across a range of
              civil, criminal, matrimonial, revenue
              and statutory matters in Siddharthnagar
              and Naugarh, Uttar Pradesh.
            </p>

            <p>
              Clients looking for an Advocate,
              Lawyer or Vakil in Siddharthnagar
              or Naugarh can seek legal assistance
              depending on the nature and facts
              of their matter.
            </p>

            <p lang="hi">
              सिद्धार्थनगर और नौगढ़ में अधिवक्ता,
              वकील या एडवोकेट से संबंधित कानूनी
              सहायता विभिन्न दीवानी, फौजदारी,
              पारिवारिक, राजस्व और अन्य कानूनी
              मामलों में उपलब्ध है।
            </p>

          </div>

          {loading && (
            <p>
              Loading latest practice areas...
            </p>
          )}

          {error && (
            <div className="admin-info-panel">
              Live practice-area data is currently
              unavailable. Core practice areas
              are shown below.
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
                        "Legal consultation available."
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
                        {area.title}
                      </h2>

                      <p>
                        {area.description}
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
              Important Note
            </p>

            <h2>
              Legal Matters Depend on
              Their Individual Facts
            </h2>

            <p>
              The information on this page
              describes broad areas of practice.
              The legal remedy, forum and
              procedure applicable to a matter
              depend on its individual facts,
              documents and applicable law.
            </p>

          </div>

        </div>

      </section>

    </>
  );
}

export default PracticeAreasPage;