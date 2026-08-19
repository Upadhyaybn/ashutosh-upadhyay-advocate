import { Link } from "react-router";
import { ROUTES } from "../../routes/routePaths";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Ashutosh Upadhyay</h3>

          <p>
            Advocate practicing at District Court,
            Siddharthnagar, Uttar Pradesh.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>

          <div className="footer-links">
            <Link to={ROUTES.ABOUT}>About</Link>

            <Link to={ROUTES.PRACTICE_AREAS}>
              Practice Areas
            </Link>

            <Link to={ROUTES.ENQUIRY}>
              Legal Enquiry
            </Link>

            <Link to={ROUTES.APPOINTMENT}>
              Appointment
            </Link>
          </div>
        </div>

        <div>
          <h4>Office</h4>

          <p>
            District Court Siddharthnagar
          </p>

          <p>
            Uttar Pradesh, India
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {year} Ashutosh Upadhyay Advocate.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;