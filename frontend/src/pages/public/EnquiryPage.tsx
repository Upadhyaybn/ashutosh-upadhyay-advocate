import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import PageHeader
  from "../../components/common/PageHeader";

import {
  submitEnquiry,
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

function EnquiryPage() {

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

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

      try {

        const response =
          await submitEnquiry({

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

            cityDistrict:
              String(
                formData.get(
                  "cityDistrict"
                ) || ""
              ).trim(),

            category:
              String(
                formData.get(
                  "category"
                ) || ""
              ),

            description:
              String(
                formData.get(
                  "description"
                )
              ).trim(),

            consent:
              formData.get(
                "consent"
              ) === "on",
          });

        setSuccess(
          response.message ||
          "Your enquiry has been submitted successfully."
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
      <PageHeader
        title="Legal Enquiry"
        description="Share a brief description of your legal concern."
      />

      <section className="section">

        <div className="container form-container">

          {success && (
            <div className="success-message">

              <h2>
                Enquiry Submitted
              </h2>

              <p>
                {success}
              </p>

            </div>
          )}

          {error && (
            <div className="error-message">

              <strong>
                Unable to submit enquiry
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
                  City / District

                  <input
                    type="text"
                    name="cityDistrict"
                    maxLength={100}
                  />
                </label>

                <label>
                  Matter Category

                  <select
                    name="category"
                    defaultValue=""
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

              </div>

              <label>
                Brief Description

                <textarea
                  name="description"
                  rows={6}
                  minLength={10}
                  required
                />
              </label>

              <p className="form-notice">
                Please avoid sharing highly confidential
                documents or sensitive personal information
                through this enquiry form.
              </p>

              <label className="checkbox-label">

                <input
                  type="checkbox"
                  name="consent"
                  required
                />

                <span>
                  I consent to being contacted
                  regarding this enquiry.
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
                    : "Submit Enquiry"
                }
              </button>

            </form>

          )}

        </div>

      </section>
    </>
  );
}

export default EnquiryPage;