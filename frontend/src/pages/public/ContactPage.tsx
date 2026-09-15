import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

import {
  Link,
} from "react-router";

import {
  ROUTES,
} from "../../routes/routePaths";

function ContactPage() {

  return (
    <>

      <Seo
        title="Contact Advocate Ashutosh Upadhyay"
        description="Contact Advocate Ashutosh Upadhyay for legal consultation, enquiries and appointment requests in Siddharthnagar and Naugarh, Uttar Pradesh."
        path="/contact"
      />

      <PageHeader
        title="Contact Advocate Ashutosh Upadhyay"
        description="Contact the advocate for legal consultation, legal enquiries or appointment requests in Siddharthnagar and Naugarh, Uttar Pradesh."
      />

      <section className="section">

        <div className="container contact-grid">

          <div className="info-card">

            <p className="eyebrow">
              Office Location
            </p>

            <h2>
              Advocate Office in Siddharthnagar
            </h2>

            <p>
              Near Hanuman Mandir,
              Civil Court Premises
            </p>

            <p>
              Siddharthnagar,
              <br />
              Uttar Pradesh 272207, India
            </p>

            <p>
              The office provides a point of
              contact for legal consultation
              and representation for clients
              in Siddharthnagar, Naugarh and
              nearby areas.
            </p>

          </div>

          <div className="info-card">

            <p className="eyebrow">
              Legal Assistance
            </p>

            <h2>
              Enquiry &amp; Appointment
            </h2>

            <p>
              You can submit your legal enquiry
              or request an appointment with
              Advocate Ashutosh Upadhyay online.
            </p>

            <div className="stacked-actions">

              <Link
                className="button button-primary"
                to={ROUTES.ENQUIRY}
              >
                Submit Enquiry
              </Link>

              <Link
                className="button button-secondary"
                to={ROUTES.APPOINTMENT}
              >
                Request Appointment
              </Link>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default ContactPage;