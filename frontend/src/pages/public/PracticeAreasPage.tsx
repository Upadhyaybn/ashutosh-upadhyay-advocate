import {
  useEffect,
  useState,
} from "react";

import PageHeader
  from "../../components/common/PageHeader";

import {
  getPracticeAreas,
} from "../../api/publicApi";

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

  return (
    <>
      <PageHeader
        title="Practice Areas"
        description="Legal services and consultation for a range of common legal matters."
      />

      <section className="section">

        <div className="container">

          {loading && (
            <p>Loading...</p>
          )}

          {error && (
            <div className="admin-info-panel">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            areas.length === 0 && (
              <div className="admin-info-panel">
                No practice areas available.
              </div>
            )}

          <div className="card-grid">

            {areas.map((area) => (

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

            ))}

          </div>

        </div>

      </section>
    </>
  );
}

export default PracticeAreasPage;