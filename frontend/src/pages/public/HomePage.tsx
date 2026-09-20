import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import Seo
  from "../../components/seo/Seo";

import ContactAction
  from "../../components/common/ContactAction";

import {
  CONTACT_INFO,
  mailtoHref,
  telHref,
  whatsappHref,
} from "../../config/contactInfo";

import {
  ROUTES,
} from "../../routes/routePaths";

import {
  practiceAreas,
} from "../../data/practiceAreas";

import {
  getProfile,
} from "../../api/publicApi";

import type {
  AdvocateProfile,
} from "../../types/api";


const FALLBACK_PHOTO_URL =
  "/images/ashutosh-upadhyay-advocate-siddharthnagar-v2.jpeg";


function HomePage() {

  const { t } = useTranslation();

  const [profile, setProfile] =
    useState<AdvocateProfile | null>(null);


  useEffect(() => {

    let active = true;


    const loadProfile = async () => {

      try {

        const data =
          await getProfile();

        if (active) {
          setProfile(data);
        }

      } catch (error) {

        console.error(
          "Unable to load advocate profile.",
          error
        );

      }

    };


    void loadProfile();


    return () => {
      active = false;
    };

  }, []);


  const advocatePhotoUrl =
    profile?.photoUrl?.trim()
      ? profile.photoUrl
      : FALLBACK_PHOTO_URL;


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
      advocatePhotoUrl,

    description:
      "Ashutosh Upadhyay is an Advocate and Lawyer providing legal consultation, case preparation and representation in Siddharthnagar and Naugarh, Uttar Pradesh across civil, criminal, family, revenue, NI Act, MACT and other legal matters.",

    telephone:
      CONTACT_INFO.primaryPhoneDigits,

    email:
      CONTACT_INFO.email,

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

    areaServed: [
      {
        "@type":
          "AdministrativeArea",

        name:
          "Siddharthnagar, Uttar Pradesh, India",
      },
      {
        "@type":
          "Place",

        name:
          "Naugarh, Siddharthnagar, Uttar Pradesh, India",
      },
    ],

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
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path="/"
        structuredData={
          structuredData
        }
      />


      <section className="hero">

        <div className="container hero-grid">

          <div className="hero-content">

            <p className="eyebrow">
              {t("home.hero.eyebrow")}
            </p>

            <h1>
              {t("home.hero.title")}
            </h1>

            <p className="hero-description">
              {t("home.hero.description")}
            </p>

            <div className="hero-actions">

              <Link
                className="button button-primary"
                to={ROUTES.APPOINTMENT}
              >
                {t("home.hero.bookAppointment")}
              </Link>

              <Link
                className="button button-secondary"
                to={ROUTES.ENQUIRY}
              >
                {t("home.hero.submitEnquiry")}
              </Link>

            </div>

          </div>


          <div className="hero-card">

            <div
              style={{
                width: "100%",
                marginBottom: "24px",
                overflow: "hidden",
                borderRadius: "16px",
              }}
            >

              <img
                src={advocatePhotoUrl}
                alt="Ashutosh Upadhyay, Advocate and Lawyer in Siddharthnagar"
                loading="eager"
                fetchPriority="high"
                style={{
                  display: "block",
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                onError={(event) => {

                  if (
                    event.currentTarget.src
                    !==
                    new URL(
                      FALLBACK_PHOTO_URL,
                      window.location.origin
                    ).href
                  ) {

                    event.currentTarget.src =
                      FALLBACK_PHOTO_URL;

                  }

                }}
              />

            </div>


            <div className="hero-card-badge">
              {t("home.hero.cardBadge")}
            </div>

            <h2>
              Ashutosh Upadhyay
            </h2>

            <p>
              {t("home.hero.cardAssociation")}
            </p>

            <hr />

            <p>
              {t("home.hero.regNo")}
            </p>

            <p>
              {t("home.hero.copNo")}
            </p>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("home.practiceAreas.eyebrow")}
            </p>

            <h2>
              {t("home.practiceAreas.title")}
            </h2>

            <p>
              {t("home.practiceAreas.description")}
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
                    {t(
                      `practiceAreaItems.${area.id}.title`,
                      { defaultValue: area.title }
                    )}
                  </h3>

                  <p>
                    {t(
                      `practiceAreaItems.${area.id}.description`,
                      { defaultValue: area.description }
                    )}
                  </p>

                </article>

              ))}

          </div>


          <div className="center-action">

            <Link
              className="button button-secondary"
              to={ROUTES.PRACTICE_AREAS}
            >
              {t("home.practiceAreas.viewAll")}
            </Link>

          </div>

        </div>

      </section>


      <section className="section section-muted">

        <div className="container trust-grid">

          <div>

            <p className="eyebrow">
              {t("home.approach.eyebrow")}
            </p>

            <h2>
              {t("home.approach.title")}
            </h2>

            <p>
              {t("home.approach.description")}
            </p>

          </div>


          <div className="trust-points">

            <div>

              <strong>
                01
              </strong>

              <span>
                {t("home.approach.step1")}
              </span>

            </div>


            <div>

              <strong>
                02
              </strong>

              <span>
                {t("home.approach.step2")}
              </span>

            </div>


            <div>

              <strong>
                03
              </strong>

              <span>
                {t("home.approach.step3")}
              </span>

            </div>


            <div>

              <strong>
                04
              </strong>

              <span>
                {t("home.approach.step4")}
              </span>

            </div>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("home.localAssistance.eyebrow")}
            </p>

            <h2>
              {t("home.localAssistance.title")}
            </h2>

            <p>
              {t("home.localAssistance.description")}
            </p>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("home.professionalDetails.eyebrow")}
            </p>

            <h2>
              {t("home.professionalDetails.title")}
            </h2>

            <p>
              {t("home.professionalDetails.description")}
            </p>

          </div>


          <div className="card-grid">

            <article className="service-card">

              <h3>
                {t("home.professionalDetails.association")}
              </h3>

              <p>
                {t("home.professionalDetails.associationValue")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.professionalDetails.regNo")}
              </h3>

              <p>
                UP01425/16
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.professionalDetails.cop")}
              </h3>

              <p>
                R1-164510
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.professionalDetails.focus")}
              </h3>

              <p>
                {t("home.professionalDetails.focusValue")}
              </p>

            </article>

          </div>

        </div>

      </section>


      <section className="section section-muted">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("home.matters.eyebrow")}
            </p>

            <h2>
              {t("home.matters.title")}
            </h2>

            <p>
              {t("home.matters.description")}
            </p>

          </div>


          <div className="card-grid">

            <article className="service-card">

              <h3>
                {t("home.matters.civil.title")}
              </h3>

              <p>
                {t("home.matters.civil.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.criminal.title")}
              </h3>

              <p>
                {t("home.matters.criminal.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.pocso.title")}
              </h3>

              <p>
                {t("home.matters.pocso.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.matrimonial.title")}
              </h3>

              <p>
                {t("home.matters.matrimonial.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.ndps.title")}
              </h3>

              <p>
                {t("home.matters.ndps.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.niAct.title")}
              </h3>

              <p>
                {t("home.matters.niAct.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.revenue.title")}
              </h3>

              <p>
                {t("home.matters.revenue.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.mact.title")}
              </h3>

              <p>
                {t("home.matters.mact.description")}
              </p>

            </article>


            <article className="service-card">

              <h3>
                {t("home.matters.government.title")}
              </h3>

              <p>
                {t("home.matters.government.description")}
              </p>

            </article>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="section-heading">

            <p className="eyebrow">
              {t("home.contactSection.eyebrow")}
            </p>

            <h2>
              {t("home.contactSection.title")}
            </h2>

          </div>


          <div className="card-grid">

            <article className="service-card">

              <h3>
                {t("common.contact.primaryContact")}
              </h3>

              <ContactAction
                type="phone"
                label={t("common.contact.primaryContact")}
                value={CONTACT_INFO.primaryPhoneDisplay}
                href={telHref(CONTACT_INFO.primaryPhoneDigits)}
              />

            </article>


            <article className="service-card">

              <h3>
                {t("common.contact.alternateContact")}
              </h3>

              <ContactAction
                type="phone"
                label={t("common.contact.alternateContact")}
                value={CONTACT_INFO.alternatePhoneDisplay}
                href={telHref(CONTACT_INFO.alternatePhoneDigits)}
              />

            </article>


            <article className="service-card">

              <h3>
                {t("common.contact.whatsapp")}
              </h3>

              <ContactAction
                type="whatsapp"
                label={t("common.contact.whatsapp")}
                value={CONTACT_INFO.whatsappDisplay}
                href={whatsappHref(CONTACT_INFO.whatsappDigits)}
              />

            </article>


            <article className="service-card">

              <h3>
                {t("common.contact.email")}
              </h3>

              <ContactAction
                type="email"
                label={t("common.contact.email")}
                value={CONTACT_INFO.email}
                href={mailtoHref(CONTACT_INFO.email)}
              />

            </article>

          </div>

        </div>

      </section>


      <section className="cta-section">

        <div className="container cta-content">

          <div>

            <h2>
              {t("home.cta.title")}
            </h2>

            <p>
              {t("home.cta.description")}
            </p>

          </div>


          <Link
            className="button button-light"
            to={ROUTES.APPOINTMENT}
          >
            {t("home.cta.action")}
          </Link>

        </div>

      </section>

    </>
  );
}


export default HomePage;
