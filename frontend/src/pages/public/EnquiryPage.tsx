import { useState } from "react";
import type { FormEvent } from "react";
import PageHeader from "../../components/common/PageHeader";

function EnquiryPage() {
  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Legal Enquiry"
        description="Share a brief description of your legal concern."
      />

      <section className="section">
        <div className="container form-container">
          {submitted ? (
            <div className="success-message">
              <h2>Enquiry Prepared</h2>

              <p>
                Frontend form is working.
                Backend submission will be connected
                in Phase 18.
              </p>
            </div>
          ) : (
            <form
              className="form-card"
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    required
                  />
                </label>

                <label>
                  Mobile Number
                  <input
                    type="tel"
                    name="mobile"
                    required
                  />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                  />
                </label>

                <label>
                  City / District
                  <input
                    type="text"
                    name="cityDistrict"
                  />
                </label>

                <label>
                  Matter Category
                  <select name="category">
                    <option value="">
                      Select category
                    </option>

                    <option>
                      Civil Matter
                    </option>

                    <option>
                      Criminal Matter
                    </option>

                    <option>
                      Family Matter
                    </option>

                    <option>
                      Property Matter
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Brief Description
                <textarea
                  name="description"
                  rows={6}
                  required
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  I consent to being contacted
                  regarding this enquiry.
                </span>
              </label>

              <button
                className="button button-primary"
                type="submit"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default EnquiryPage;