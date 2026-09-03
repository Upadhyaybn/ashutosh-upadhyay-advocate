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

    "@id":
      "https://www.ashutoshupadhyayadvocate.com/#legalservice",

    name:
      "Ashutosh Upadhyay, Advocate",

    alternateName:
      "Advocate Ashutosh Upadhyay",

    url:
      "https://www.ashutoshupadhyayadvocate.com",

    image:
      "https://www.ashutoshupadhyayadvocate.com/images/ashutosh-upadhyay-advocate-siddharthnagar.jpeg",

    description:
      "Ashutosh Upadhyay, Advocate provides legal consultation, case preparation and representation in Siddharthnagar, Uttar Pradesh across civil, criminal, family, revenue, NI Act, MACT and other legal matters.",

    telephone:
      "+91-9628395566",

    email:
      "ashutoshadvocate24@gmail.com",

    address: {

      "@type":
        "PostalAddress",

      streetAddress:
        "Near Hanuman Mandir, Civil Court premises",

      addressLocality:
        "Siddharthnagar",

      addressRegion:
        "Uttar Pradesh",

      postalCode:
        "272207",

      addressCountry:
        "IN",
    },

    areaServed: {

      "@type":
        "AdministrativeArea",

      name:
        "Siddharthnagar, Uttar Pradesh, India",
    },

    hasOfferCatalog: {

      "@type":
        "OfferCatalog",

      name:
        "Legal Practice Areas",

      itemListElement:
        practiceAreas.map(
          (area) => ({

            "@type":
              "Offer",

            itemOffered: {

              "@type":
                "Service",

              name:
                area.title,

              description:
                area.description,
            },

          })
        ),
    },

  };

  return (
    <>

      <Seo
        title="Advocate in Siddharthnagar, Uttar Pradesh"
        description="Ashutosh Upadhyay, Advocate provides legal consultation, case preparation and representation in Siddharthnagar for civil, criminal, family, revenue, NI Act, MACT and related matters."
        path="/"
        structuredData={
          structuredData
        }
      />

      <section className="hero">

        <div className="container hero-grid">

          <div className="hero-content">

            <p className="eyebrow">
              C.S.B.A. • Civil Siddharthnagar
              Bar Association
            </p>

            <h1>
              Advocate in Siddharthnagar
              for Legal Consultation
              and Representation
            </h1>

            <p className="hero-description">
              Ashutosh Upadhyay, Advocate provides
              legal consultation, legal research,
              case preparation and representation
              across a wide range of legal matters
              in Siddharthnagar, Uttar Pradesh.
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
              C.S.B.A.
              (Civil Siddharthnagar
              Bar Association)
            </p>

            <hr />

            <p>
              Reg. No.: UP01425/16
            </p>

            <p>
              C.O.P. No.: R1-164510
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
              Legal assistance and representation
              across civil, criminal, matrimonial,
              revenue, accident-claim and other
              legal matters.
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
              Research, Preparation
              and Representation
            </h2>

            <p>
              Legal matters are approached through
              careful understanding of facts,
              interpretation of applicable law,
              legal research, procedural preparation
              and responsible representation.
            </p>

          </div>

          <div className="trust-points">

            <div>

              <strong>
                01
              </strong>

              <span>
                Understand facts,
                documents and legal issues
              </span>

            </div>

            <div>

              <strong>
                02
              </strong>

              <span>
                Research statutes,
                procedure and legal principles
              </span>

            </div>

            <div>

              <strong>
                03
              </strong>

              <span>
                Prepare pleadings,
                applications and strategy
              </span>

            </div>

            <div>

              <strong>
                04
              </strong>

              <span>
                Represent the lawful case
                before the appropriate forum
              </span>

            </div>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Professional Details
            </p>

            <h2>
              Advocate Ashutosh Upadhyay
            </h2>

            <p>
              Professional practice associated
              with the Civil Siddharthnagar
              Bar Association, Siddharthnagar,
              Uttar Pradesh.
            </p>

          </div>

          <div className="card-grid">

            <article className="service-card">

              <h3>
                Association
              </h3>

              <p>
                C.S.B.A.
                (Civil Siddharthnagar
                Bar Association)
              </p>

            </article>

            <article className="service-card">

              <h3>
                Registration Number
              </h3>

              <p>
                UP01425/16
              </p>

            </article>

            <article className="service-card">

              <h3>
                Certificate of Practice
              </h3>

              <p>
                R1-164510
              </p>

            </article>

            <article className="service-card">

              <h3>
                Professional Focus
              </h3>

              <p>
                Litigation, legal research,
                drafting, case preparation
                and representation.
              </p>

            </article>

          </div>

        </div>

      </section>

      <section className="section section-muted">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Major Legal Practice Areas
            </p>

            <h2>
              Legal Matters Handled
            </h2>

            <p>
              Professional assistance is available
              across the following principal
              categories of legal work.
            </p>

          </div>

          <div className="card-grid">

            <article className="service-card">
              <h3>Civil Matters</h3>
              <p>
                Civil suits, injunctions,
                declarations, recovery,
                execution, property,
                succession and related matters.
              </p>
            </article>

            <article className="service-card">
              <h3>Criminal Matters</h3>
              <p>
                Criminal trials, complaints,
                procedural matters and related
                criminal proceedings.
              </p>
            </article>

            <article className="service-card">
              <h3>POCSO Cases</h3>
              <p>
                Professional assistance and
                representation in proceedings
                under the POCSO Act.
              </p>
            </article>

            <article className="service-card">
              <h3>Matrimonial &amp; Family Matters</h3>
              <p>
                Matrimonial disputes,
                maintenance, domestic violence
                and related family-law matters.
              </p>
            </article>

            <article className="service-card">
              <h3>NDPS Cases</h3>
              <p>
                Professional assistance and
                representation in proceedings
                under the NDPS Act.
              </p>
            </article>

            <article className="service-card">
              <h3>NI Act Matters</h3>
              <p>
                Cheque-related disputes,
                cheque bounce cases and
                proceedings under the
                Negotiable Instruments Act.
              </p>
            </article>

            <article className="service-card">
              <h3>Revenue Matters</h3>
              <p>
                Partition, mutation, demarcation,
                boundary disputes, revenue records
                and proceedings before revenue
                authorities.
              </p>
            </article>

            <article className="service-card">
              <h3>Motor Accident Claims</h3>
              <p>
                Representation before MACT
                in accident compensation,
                injury, death and related claims.
              </p>
            </article>

            <article className="service-card">
              <h3>
                Government Authority Matters
              </h3>
              <p>
                Legal assistance concerning
                unlawful or arbitrary actions
                of police, revenue departments,
                district administration and
                other public authorities.
              </p>
            </article>

          </div>

        </div>

      </section>

      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              Contact
            </p>

            <h2>
              Contact Advocate
              Ashutosh Upadhyay
            </h2>

          </div>

          <div className="card-grid">

            <article className="service-card">

              <h3>
                Primary Contact
              </h3>

              <p>
                <a href="tel:+919628395566">
                  +91 9628395566
                </a>
              </p>

            </article>

            <article className="service-card">

              <h3>
                Alternate Contact
              </h3>

              <p>
                <a href="tel:+919565875651">
                  +91 9565875651
                </a>
              </p>

            </article>

            <article className="service-card">

              <h3>
                WhatsApp
              </h3>

              <p>
                <a
                  href="https://wa.me/919628395566"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91 9628395566
                </a>
              </p>

            </article>

            <article className="service-card">

              <h3>
                Email
              </h3>

              <p>
                <a
                  href="mailto:ashutoshadvocate24@gmail.com"
                >
                  ashutoshadvocate24@gmail.com
                </a>
              </p>

            </article>

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
              Submit a legal enquiry or
              request an appointment.
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