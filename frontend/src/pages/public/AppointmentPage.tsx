import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import Seo
  from "../../components/seo/Seo";

import PageHeader
  from "../../components/common/PageHeader";

import {
  submitAppointment,
} from "../../api/publicApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

function normalizeMobile(
  value: string
): string {

  const digits =
    value.replace(/\D/g, "");

  if (
    digits.length === 11 &&
    digits.startsWith("0")
  ) {
    return digits.substring(1);
  }

  return digits;
}

function AppointmentPage() {

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setSubmitting(true);
      setSuccess("");
      setError("");

      const currentForm =
        event.currentTarget;

      const formData =
        new FormData(currentForm);

      const mobile =
        normalizeMobile(
          String(
            formData.get("mobile")
          )
        );

      if (!/^[6-9]\d{9}$/.test(mobile)) {

        setError(
          "Please enter a valid 10-digit Indian mobile number."
        );

        setSubmitting(false);

        return;
      }

      const preferredTime =
        String(
          formData.get(
            "preferredTime"
          ) || ""
        );

      const formattedTime =
        preferredTime
          ? `${preferredTime}:00`
          : "";

      try {

        const response =
          await submitAppointment({

            fullName:
              String(
                formData.get(
                  "fullName"
                )
              ).trim(),

            mobile,

            email:
              String(
                formData.get(
                  "email"
                ) || ""
              ).trim(),

            preferredDate:
              String(
                formData.get(
                  "preferredDate"
                )
              ),

            preferredTime:
              formattedTime,

            matterCategory:
              String(
                formData.get(
                  "matterCategory"
                )
              ).trim(),

            communicationMethod:
              String(
                formData.get(
                  "communicationMethod"
                )
              ),

            shortNote:
              String(
                formData.get(
                  "shortNote"
                ) || ""
              ).trim(),

            consent:
              formData.get(
                "consent"
              ) === "on",
          });

        setSuccess(
          response.message ||
          "Your appointment request has been submitted successfully."
        );

        currentForm.reset();

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setSubmitting(false);
      }
    };

  return (
    <>

      <Seo
        title="Request Legal Consultation Appointment"
        description="Request an appointment with Advocate Ashutosh Upadhyay for legal consultation in Siddharthnagar, Uttar Pradesh."
        path="/appointment"
        index={false}
      />

      <PageHeader
        title="Request Appointment"
        description="Request a preferred date and time for legal consultation."
      />

      <section className="section">

        <div className="container form-container">

          {success && (

            <div className="success-message">

              <h2>
                Appointment Requested
              </h2>

              <p>
                {success}
              </p>

            </div>

          )}

          {error && (

            <div className="error-message">

              <strong>
                Unable to submit appointment
              </strong>

              <p>
                {error}
              </p>

            </div>

          )}

          {!success && (

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
                    minLength={2}
                    maxLength={150}
                    required
                  />

                </label>

                <label>
                  Mobile Number

                  <input
                    type="tel"
                    name="mobile"
                    inputMode="numeric"
                    placeholder="9876543210"
                    maxLength={11}
                    required
                  />

                  <small>
                    Enter a 10-digit Indian mobile number.
                  </small>

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
                    min={today}
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

                  <select
                    name="matterCategory"
                    defaultValue=""
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="Civil Matter">
                      Civil Matter
                    </option>

                    <option value="Criminal Matter">
                      Criminal Matter
                    </option>

                    <option value="Family Matter">
                      Family Matter
                    </option>

                    <option value="Property Matter">
                      Property Matter
                    </option>

                    <option value="Consumer Matter">
                      Consumer Matter
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

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
                  maxLength={1000}
                />

              </label>

              <label className="checkbox-label">

                <input
                  type="checkbox"
                  name="consent"
                  required
                />

                <span>
                  I consent to being contacted
                  regarding this appointment.
                </span>

              </label>

              <button
                type="submit"
                className="button button-primary"
                disabled={submitting}
              >

                {
                  submitting
                    ? "Submitting..."
                    : "Request Appointment"
                }

              </button>

            </form>

          )}

        </div>

      </section>

    </>
  );
}

export default AppointmentPage;