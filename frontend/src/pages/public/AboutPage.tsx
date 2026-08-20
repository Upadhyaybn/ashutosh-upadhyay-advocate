import {
  useEffect,
  useState,
} from "react";

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
      <PageHeader
        title="About Advocate"
        description="Professional legal services and representation in Siddharthnagar, Uttar Pradesh."
      />

      <section className="section">
        <div className="container">

          {loading && (
            <p>Loading profile...</p>
          )}

          {error && (
            <div className="admin-info-panel">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            profile && (

              <div className="content-grid">

                <div>

                  <p className="eyebrow">
                    {
                      profile.designation ||
                      "Advocate"
                    }
                  </p>

                  <h2>
                    {profile.fullName}
                  </h2>

                  {profile.professionalBio && (
                    <p>
                      {
                        profile
                          .professionalBio
                      }
                    </p>
                  )}

                </div>

                <aside className="info-card">

                  <h3>
                    Professional Details
                  </h3>

                  <dl>

                    <div>
                      <dt>Designation</dt>
                      <dd>
                        {
                          profile.designation ||
                          "-"
                        }
                      </dd>
                    </div>

                    <div>
                      <dt>Court</dt>
                      <dd>
                        {
                          profile
                            .courtsOfPractice ||
                          "-"
                        }
                      </dd>
                    </div>

                    <div>
                      <dt>Location</dt>
                      <dd>
                        {
                          profile
                            .officeAddress ||
                          "-"
                        }
                      </dd>
                    </div>

                    <div>
                      <dt>Languages</dt>
                      <dd>
                        {
                          profile.languages ||
                          "-"
                        }
                      </dd>
                    </div>

                  </dl>

                </aside>

              </div>

            )}

        </div>
      </section>
    </>
  );
}

export default AboutPage;