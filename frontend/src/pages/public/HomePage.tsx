import { Link } from "react-router";

import Seo
  from "../../components/seo/Seo";

import {
  ROUTES,
} from "../../routes/routePaths";

import {
  practiceAreas,
} from "../../data/practiceAreas";

function HomePage() {

  const structuredData = {

    "@context":
      "https://schema.org",

    "@type":
      "LegalService",

    name:
      "Advocate Ashutosh Upadhyay",

    url:
      "https://www.ashutoshupadhyayadvocate.com",

    description:
      "Professional legal consultation and representation in Siddharthnagar, Uttar Pradesh.",

    areaServed: {
      "@type":
        "AdministrativeArea",

      name:
        "Siddharthnagar, Uttar Pradesh, India",
    },

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        "Siddharthnagar",

      addressRegion:
        "Uttar Pradesh",

      addressCountry:
        "IN",
    },

  };

  return (
    <>

      <Seo
        title="Advocate in Siddharthnagar, Uttar Pradesh"
        description="Advocate Ashutosh Upadhyay provides professional legal consultation, case guidance and representation in Siddharthnagar, Uttar Pradesh."
        path="/"
        structuredData={
          structuredData
        }
      />

      <section className="hero">

        <div className="container hero-grid">

          <div className="hero-content">

            <p className="eyebrow">
              District Court Siddharthnagar
            </p>

            <h1>
              Advocate in Siddharthnagar
              for Legal Consultation
              and Representation
            </h1>

            <p className="hero-description">
              Advocate Ashutosh Upadhyay provides
              professional legal consultation,
              case guidance and representation
              in Siddharthnagar,
              Uttar Pradesh.
            </p>

            <div className="hero-actions">

              <Link
                className="button button-primary"
                to={ROUTES.APPOINTMENT}
              >
                Book Appointment
              </Link>

              <Link
                className="button button-secondary"
                to={ROUTES.ENQUIRY}
              >
                Submit Enquiry
              </Link>

            </div>

          </div>

          <div className="hero-card">

            <div className="hero-card-badge">
              Advocate
            </div>

            <h2>
              Ashutosh Upadhyay
            </h2>

            <p>
              District Court Siddharthnagar,
              Uttar Pradesh
            </p>

            <hr />

            <p>
              Professional legal consultation,
              case guidance and court
              representation.
            </p>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Legal Services
            </p>

            <h2>
              Practice Areas
            </h2>

            <p>
              Legal assistance across important
              areas of individual and family
              legal requirements.
            </p>

          </div>

          <div className="card-grid">

            {practiceAreas
              .slice(0, 6)
              .map((area) => (

                <article
                  key={area.id}
                  className="service-card"
                >

                  <h3>
                    {area.title}
                  </h3>

                  <p>
                    {area.description}
                  </p>

                </article>

              ))}

          </div>

          <div className="center-action">

            <Link
              className="button button-secondary"
              to={ROUTES.PRACTICE_AREAS}
            >
              View All Practice Areas
            </Link>

          </div>

        </div>

      </section>

      <section className="section section-muted">

        <div className="container trust-grid">

          <div>

            <p className="eyebrow">
              Professional Approach
            </p>

            <h2>
              Clear Guidance Throughout
              Your Legal Matter
            </h2>

          </div>

          <div className="trust-points">

            <div>

              <strong>
                01
              </strong>

              <span>
                Understand your legal concern
              </span>

            </div>

            <div>

              <strong>
                02
              </strong>

              <span>
                Review available legal options
              </span>

            </div>

            <div>

              <strong>
                03
              </strong>

              <span>
                Plan the appropriate next steps
              </span>

            </div>

          </div>

        </div>

      </section>

      <section className="cta-section">

        <div className="container cta-content">

          <div>

            <h2>
              Need Legal Assistance?
            </h2>

            <p>
              Submit your enquiry or request
              an appointment.
            </p>

          </div>

          <Link
            className="button button-light"
            to={ROUTES.APPOINTMENT}
          >
            Request Appointment
          </Link>

        </div>

      </section>

    </>
  );
}

export default HomePage;