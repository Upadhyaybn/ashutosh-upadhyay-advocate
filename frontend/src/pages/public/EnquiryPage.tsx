import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

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

  const { t } = useTranslation();

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
          t("enquiry.invalidMobile")
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
          t("enquiry.successFallback")
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
        title={t("seo.enquiry.title")}
        description={t("seo.enquiry.description")}
        path="/enquiry"
        index={false}
      />

      <PageHeader
        title={t("enquiry.pageTitle")}
        description={t("enquiry.pageDescription")}
      />

      <section className="section">

        <div className="container form-container">

          {success && (

            <div className="success-message">

              <h2>
                {t("enquiry.successTitle")}
              </h2>

              <p>
                {success}
              </p>

            </div>

          )}

          {error && (

            <div className="error-message">

              <strong>
                {t("enquiry.errorTitle")}
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
                  {t("enquiry.form.fullName")}

                  <input
                    type="text"
                    name="fullName"
                    minLength={2}
                    maxLength={150}
                    required
                  />

                </label>

                <label>
                  {t("enquiry.form.mobile")}

                  <input
                    type="tel"
                    name="mobile"
                    inputMode="numeric"
                    placeholder={t("enquiry.form.mobilePlaceholder")}
                    maxLength={11}
                    required
                  />

                  <small>
                    {t("enquiry.form.mobileHint")}
                  </small>

                </label>

                <label>
                  {t("enquiry.form.email")}

                  <input
                    type="email"
                    name="email"
                  />

                </label>

                <label>
                  {t("enquiry.form.cityDistrict")}

                  <input
                    type="text"
                    name="cityDistrict"
                    maxLength={100}
                  />

                </label>

                <label>
                  {t("enquiry.form.category")}

                  <select
                    name="category"
                    defaultValue=""
                  >

                    <option value="">
                      {t("enquiry.form.selectCategory")}
                    </option>

                    <option value="Civil Matter">
                      {t("enquiry.form.categoryCivil")}
                    </option>

                    <option value="Criminal Matter">
                      {t("enquiry.form.categoryCriminal")}
                    </option>

                    <option value="Family Matter">
                      {t("enquiry.form.categoryFamily")}
                    </option>

                    <option value="Property Matter">
                      {t("enquiry.form.categoryProperty")}
                    </option>

                    <option value="Consumer Matter">
                      {t("enquiry.form.categoryConsumer")}
                    </option>

                    <option value="Other">
                      {t("enquiry.form.categoryOther")}
                    </option>

                  </select>

                </label>

              </div>

              <label>
                {t("enquiry.form.description")}

                <textarea
                  name="description"
                  rows={6}
                  minLength={10}
                  required
                />

              </label>

              <p className="form-notice">
                {t("enquiry.form.notice")}
              </p>

              <label className="checkbox-label">

                <input
                  type="checkbox"
                  name="consent"
                  required
                />

                <span>
                  {t("enquiry.form.consent")}
                </span>

              </label>

              <button
                type="submit"
                className="button button-primary"
                disabled={submitting}
              >

                {
                  submitting
                    ? t("enquiry.form.submitting")
                    : t("enquiry.form.submit")
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
