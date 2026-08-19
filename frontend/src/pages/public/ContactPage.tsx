import PageHeader from "../../components/common/PageHeader";
import { Link } from "react-router";
import { ROUTES } from "../../routes/routePaths";

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Contact the advocate for legal consultation or appointment requests."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="info-card">
            <h2>Office</h2>

            <p>
              District Court Siddharthnagar
            </p>

            <p>
              Siddharthnagar,
              Uttar Pradesh, India
            </p>
          </div>

          <div className="info-card">
            <h2>Legal Assistance</h2>

            <p>
              You can submit your legal enquiry
              or request an appointment online.
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