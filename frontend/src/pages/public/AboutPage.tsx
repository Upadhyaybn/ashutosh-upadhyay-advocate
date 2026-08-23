import {
  useEffect,
  useState,
} from "react";

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
        title="About Advocate Ashutosh Upadhyay"
        description="Learn about Advocate Ashutosh Upadhyay, associated with the Civil Siddharthnagar Bar Association, his professional journey, legal research experience and practice in Siddharthnagar, Uttar Pradesh."
        path="/about"
      />

      <PageHeader
        title="About Advocate Ashutosh Upadhyay"
        description="Professional profile, legal journey and practice experience in Siddharthnagar, Uttar Pradesh."
      />

      <section className="section">

        <div className="container">

          <div className="content-grid">

            <div>

              <p className="eyebrow">
                Professional Profile
              </p>

              <h2>
                Ashutosh Upadhyay, Advocate
              </h2>

              <p>
                Ashutosh Upadhyay is associated
                with the Civil Siddharthnagar
                Bar Association (C.S.B.A.) and
                practices in Siddharthnagar,
                Uttar Pradesh.
              </p>

              <p>
                His professional work includes
                litigation, legal research,
                interpretation of statutes,
                drafting, procedural preparation,
                case analysis and legal
                representation across a range
                of civil and criminal matters.
              </p>

            </div>

            <aside className="info-card">

              <h3>
                Professional Details
              </h3>

              <dl>

                <div>
                  <dt>Association</dt>
                  <dd>
                    C.S.B.A. - Civil
                    Siddharthnagar Bar Association
                  </dd>
                </div>

                <div>
                  <dt>Registration No.</dt>
                  <dd>
                    UP01425/16
                  </dd>
                </div>

                <div>
                  <dt>C.O.P. No.</dt>
                  <dd>
                    R1-164510
                  </dd>
                </div>

                <div>
                  <dt>Primary Contact</dt>
                  <dd>
                    <a href="tel:+919628395566">
                      +91 9628395566
                    </a>
                  </dd>
                </div>

                <div>
                  <dt>WhatsApp</dt>
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
                  <dt>Email</dt>
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
              Professional Journey
            </p>

            <h2>
              Legal Training and Practice Exposure
            </h2>

          </div>

          <div className="card-grid">

            <article className="service-card">

              <h3>
                Judicial Preparation - Delhi
              </h3>

              <p>
                Undertook judicial-services
                preparation at Rahul&apos;s IAS,
                Mukherjee Nagar, Delhi, with
                exposure to legal research,
                statutory interpretation,
                procedural law and legal analysis.
              </p>

            </article>

            <article className="service-card">

              <h3>
                Lucknow Bench Exposure
              </h3>

              <p>
                Gained professional exposure at
                the Lucknow Bench of the
                Allahabad High Court under
                CSC Mayankar Singh, Advocate
                (Senior), including service
                matters, contract matters,
                mediation and procedural practice.
              </p>

            </article>

            <article className="service-card">

              <h3>
                Civil Practice
              </h3>

              <p>
                Developed civil-practice experience
                under Sri Gangaram Pandey,
                including property disputes,
                land disputes, injunctions,
                declarations, succession,
                NI Act matters, arbitration,
                commercial matters and
                consumer disputes.
              </p>

            </article>

            <article className="service-card">

              <h3>
                Criminal Practice
              </h3>

              <p>
                Gained practical understanding
                of criminal litigation through
                guidance from Sri Suresh Singh,
                Sri Sanjay Srivastava and
                Sri Gajendranath Pandey,
                Advocates.
              </p>

            </article>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Professional Approach
            </p>

            <h2>
              Research, Analysis and Preparation
            </h2>

            <p>
              The practice approach focuses on
              understanding facts, studying
              applicable law, analysing legal
              issues, preparing the matter
              carefully and presenting the lawful
              case before the appropriate forum.
            </p>

          </div>

        </div>

      </section>

      {loading && (
        <section className="section">
          <div className="container">
            <p>Loading profile...</p>
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
                  Current Professional Profile
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