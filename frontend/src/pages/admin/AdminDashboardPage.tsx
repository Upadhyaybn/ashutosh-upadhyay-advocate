function AdminDashboardPage() {
  return (
    <>
      <div className="admin-page-header">
        <div>
          <p className="eyebrow">
            Administration
          </p>

          <h1>Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <span>New Enquiries</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-card">
          <span>Appointments</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-card">
          <span>Practice Areas</span>
          <strong>0</strong>
        </article>

        <article className="dashboard-card">
          <span>Audit Events</span>
          <strong>0</strong>
        </article>
      </div>

      <div className="admin-info-panel">
        Backend dashboard statistics will be
        connected during Phase 18.
      </div>
    </>
  );
}

export default AdminDashboardPage;