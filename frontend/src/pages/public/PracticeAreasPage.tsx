import PageHeader from "../../components/common/PageHeader";
import { practiceAreas } from "../../data/practiceAreas";

function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        title="Practice Areas"
        description="Legal services and consultation for a range of common legal matters."
      />

      <section className="section">
        <div className="container card-grid">
          {practiceAreas.map((area) => (
            <article
              key={area.id}
              className="service-card"
            >
              <h2>{area.title}</h2>

              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default PracticeAreasPage;