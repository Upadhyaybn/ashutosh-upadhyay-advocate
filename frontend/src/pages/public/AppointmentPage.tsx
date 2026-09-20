import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import { useTranslation } from "react-i18next";

import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { enIN } from "date-fns/locale/en-IN";
import { hi } from "date-fns/locale/hi";
import "react-day-picker/style.css";

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

function generateTimeSlots(): string[] {

  const slots: string[] = [];

  for (let hour = 10; hour <= 18; hour++) {

    slots.push(
      `${String(hour).padStart(2, "0")}:00`
    );

    if (hour !== 18) {
      slots.push(
        `${String(hour).padStart(2, "0")}:30`
      );
    }
  }

  return slots;
}

const TIME_SLOTS = generateTimeSlots();

const TODAY = new Date();

function AppointmentPage() {

  const { t, i18n } = useTranslation();

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState<Date | undefined>(undefined);

  const [selectedTime, setSelectedTime] =
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
          t("appointment.invalidMobile")
        );

        setSubmitting(false);

        return;
      }

      if (!selectedDate) {

        setError(
          t("appointment.invalidDate")
        );

        setSubmitting(false);

        return;
      }

      const formattedTime =
        selectedTime
          ? `${selectedTime}:00`
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
              format(
                selectedDate,
                "yyyy-MM-dd"
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
          t("appointment.successFallback")
        );

        currentForm.reset();
        setSelectedDate(undefined);
        setSelectedTime("");

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
        title={t("seo.appointment.title")}
        description={t("seo.appointment.description")}
        path="/appointment"
        index={false}
      />

      <PageHeader
        title={t("appointment.pageTitle")}
        description={t("appointment.pageDescription")}
      />

      <section className="section">

        <div className="container form-container">

          {success && (

            <div className="success-message">

              <h2>
                {t("appointment.successTitle")}
              </h2>

              <p>
                {success}
              </p>

            </div>

          )}

          {error && (

            <div className="error-message">

              <strong>
                {t("appointment.errorTitle")}
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
                  <span className="form-label-text">
                    {t("appointment.form.fullName")}
                    <span
                      className="required-mark"
                      aria-hidden="true"
                    >
                      {" "}*
                    </span>
                  </span>

                  <input
                    type="text"
                    name="fullName"
                    minLength={2}
                    maxLength={150}
                    required
                  />

                </label>

                <label>
                  <span className="form-label-text">
                    {t("appointment.form.mobile")}
                    <span
                      className="required-mark"
                      aria-hidden="true"
                    >
                      {" "}*
                    </span>
                  </span>

                  <input
                    type="tel"
                    name="mobile"
                    inputMode="numeric"
                    maxLength={11}
                    required
                  />

                  <small>
                    {t("appointment.form.mobileHint")}
                  </small>

                </label>

                <label>
                  {t("appointment.form.email")}

                  <input
                    type="email"
                    name="email"
                  />

                </label>

                <label>
                  <span className="form-label-text">
                    {t("appointment.form.category")}
                    <span
                      className="required-mark"
                      aria-hidden="true"
                    >
                      {" "}*
                    </span>
                  </span>

                  <select
                    name="matterCategory"
                    defaultValue=""
                    required
                  >

                    <option value="">
                      {t("appointment.form.selectCategory")}
                    </option>

                    <option value="Civil Matter">
                      {t("appointment.form.categoryCivil")}
                    </option>

                    <option value="Criminal Matter">
                      {t("appointment.form.categoryCriminal")}
                    </option>

                    <option value="Family Matter">
                      {t("appointment.form.categoryFamily")}
                    </option>

                    <option value="Property Matter">
                      {t("appointment.form.categoryProperty")}
                    </option>

                    <option value="Consumer Matter">
                      {t("appointment.form.categoryConsumer")}
                    </option>

                    <option value="Other">
                      {t("appointment.form.categoryOther")}
                    </option>

                  </select>

                </label>

                <label>
                  {t("appointment.form.communicationMethod")}

                  <select
                    name="communicationMethod"
                    defaultValue="PHONE"
                  >

                    <option value="PHONE">
                      {t("appointment.form.commPhone")}
                    </option>

                    <option value="WHATSAPP">
                      {t("appointment.form.commWhatsapp")}
                    </option>

                    <option value="EMAIL">
                      {t("appointment.form.commEmail")}
                    </option>

                  </select>

                </label>

              </div>

              <div className="scheduling-grid">

                <div className="scheduling-field">

                  <p className="scheduling-label">
                    {t("appointment.form.preferredDate")}
                  </p>

                  <div className="appointment-datepicker">

                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: TODAY }}
                      locale={
                        i18n.language === "hi"
                          ? hi
                          : enIN
                      }
                      required={false}
                    />

                  </div>

                  <p className="scheduling-selected-value">
                    {selectedDate
                      ? format(
                          selectedDate,
                          "PPP"
                        )
                      : t("appointment.noDateSelected")}
                  </p>

                </div>

                <div className="scheduling-field">

                  <p className="scheduling-label">
                    {t("appointment.form.preferredTime")}
                  </p>

                  <div
                    className="time-slot-grid"
                    role="group"
                    aria-label={t("appointment.form.preferredTime")}
                  >

                    {TIME_SLOTS.map((slot) => (

                      <button
                        key={slot}
                        type="button"
                        className={
                          selectedTime === slot
                            ? "time-slot is-selected"
                            : "time-slot"
                        }
                        aria-pressed={
                          selectedTime === slot
                        }
                        onClick={() =>
                          setSelectedTime(
                            (current) =>
                              current === slot
                                ? ""
                                : slot
                          )
                        }
                      >
                        {slot}
                      </button>

                    ))}

                  </div>

                  <p className="scheduling-selected-value">
                    {selectedTime ||
                      t("appointment.noTimeSelected")}
                  </p>

                </div>

              </div>

              <label>
                {t("appointment.form.shortNote")}

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
                  {t("appointment.form.consent")}
                </span>

              </label>

              <button
                type="submit"
                className="button button-primary"
                disabled={submitting}
              >

                {
                  submitting
                    ? t("appointment.form.submitting")
                    : t("appointment.form.submit")
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
