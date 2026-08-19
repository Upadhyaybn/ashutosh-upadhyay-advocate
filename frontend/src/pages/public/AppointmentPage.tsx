import { useState } from "react";
import type { FormEvent } from "react";
import PageHeader from "../../components/common/PageHeader";

function AppointmentPage() {
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
        title="Request Appointment"
        description="Request a preferred date and time for legal consultation."
      />

      <section className="section">
        <div className="container form-container">
          {submitted ? (
            <div className="success-message">
              <h2>
                Appointment Request Prepared
              </h2>

              <p>
                Backend submission will be connected
                during Phase 18.
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
                  Preferred Date
                  <input
                    type="date"
                    name="preferredDate"
                    required
                  />
                </label>

                <label>
                  Preferred Time
                  <input
                    type="time"
                    name="preferredTime"
                  />
                </label>

                <label>
                  Matter Category
                  <input
                    name="matterCategory"
                    required
                  />
                </label>

                <label>
                  Preferred Communication
                  <select
                    name="communicationMethod"
                    defaultValue="PHONE"
                  >
                    <option value="PHONE">
                      Phone
                    </option>

                    <option value="WHATSAPP">
                      WhatsApp
                    </option>

                    <option value="EMAIL">
                      Email
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Short Note
                <textarea
                  name="shortNote"
                  rows={5}
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  I consent to being contacted
                  regarding this appointment.
                </span>
              </label>

              <button
                className="button button-primary"
                type="submit"
              >
                Request Appointment
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default AppointmentPage;