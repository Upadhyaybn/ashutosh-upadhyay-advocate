import PageHeader from "../../components/common/PageHeader";

function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Advocate"
        description="Professional legal services and representation in Siddharthnagar, Uttar Pradesh."
      />

      <section className="section">
        <div className="container content-grid">
          <div>
            <p className="eyebrow">
              Advocate
            </p>

            <h2>Ashutosh Upadhyay</h2>

            <p>
              Ashutosh Upadhyay is an Advocate
              practicing at District Court
              Siddharthnagar, Uttar Pradesh.
            </p>

            <p>
              The practice focuses on providing
              professional legal consultation,
              understanding client concerns and
              assisting clients through appropriate
              legal procedures.
            </p>
          </div>

          <aside className="info-card">
            <h3>Professional Details</h3>

            <dl>
              <div>
                <dt>Designation</dt>
                <dd>Advocate</dd>
              </div>

              <div>
                <dt>Court</dt>
                <dd>
                  District Court Siddharthnagar
                </dd>
              </div>

              <div>
                <dt>Location</dt>
                <dd>
                  Siddharthnagar, Uttar Pradesh
                </dd>
              </div>

              <div>
                <dt>Languages</dt>
                <dd>Hindi, English</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

export default AboutPage;