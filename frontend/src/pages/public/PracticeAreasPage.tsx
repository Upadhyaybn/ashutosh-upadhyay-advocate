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
        description="Explore legal services provided by Advocate Ashutosh Upadhyay in Siddharthnagar including civil, criminal, POCSO, matrimonial, NDPS, NI Act, revenue, MACT and government authority matters."
        path="/practice-areas"
      />

      <PageHeader
        title="Practice Areas"
        description="Legal consultation, case preparation and representation across a range of civil, criminal and statutory matters."
      />

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Legal Services
            </p>

            <h2>
              Legal Practice Areas
              in Siddharthnagar
            </h2>

            <p>
              Professional assistance is
              available across the following
              principal categories of legal work.
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