import {
  useEffect,
  useState,
} from "react";

import {
  getAdminAppointments,
  getAdminEnquiries,
  getAdminPracticeAreas,
  getAuditLogs,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

interface DashboardStats {
  enquiries: number;
  appointments: number;
  practiceAreas: number;
  auditLogs: number;
}

function AdminDashboardPage() {

  const [stats, setStats] =
    useState<DashboardStats>({
      enquiries: 0,
      appointments: 0,
      practiceAreas: 0,
      auditLogs: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const [
            enquiries,
            appointments,
            practiceAreas,
            auditLogs,
          ] =
            await Promise.all([
              getAdminEnquiries(),
              getAdminAppointments(),
              getAdminPracticeAreas(),
              getAuditLogs(),
            ]);

          setStats({
            enquiries:
              enquiries.length,

            appointments:
              appointments.length,

            practiceAreas:
              practiceAreas.length,

            auditLogs:
              auditLogs.length,
          });

        } catch (err) {

          setError(
            getApiErrorMessage(err)
          );

        } finally {

          setLoading(false);
        }
      };

    void loadDashboard();

  }, []);

  return (
    <>

      <div className="admin-page-header">

        <div>

          <p className="eyebrow">
            Administration
          </p>

          <h1>
            Dashboard
          </h1>

        </div>

      </div>

      {loading && (
        <div className="admin-info-panel">
          Loading dashboard...
        </div>
      )}

      {error && (
        <div className="error-message">

          <strong>
            Unable to load dashboard
          </strong>

          <p>
            {error}
          </p>

        </div>
      )}

      {!loading &&
        !error && (

          <>

            <div className="dashboard-grid">

              <article className="dashboard-card">

                <span>
                  Enquiries
                </span>

                <strong>
                  {stats.enquiries}
                </strong>

              </article>

              <article className="dashboard-card">

                <span>
                  Appointments
                </span>

                <strong>
                  {
                    stats.appointments
                  }
                </strong>

              </article>

              <article className="dashboard-card">

                <span>
                  Practice Areas
                </span>

                <strong>
                  {
                    stats.practiceAreas
                  }
                </strong>

              </article>

              <article className="dashboard-card">

                <span>
                  Audit Events
                </span>

                <strong>
                  {
                    stats.auditLogs
                  }
                </strong>

              </article>

            </div>

            <div className="admin-info-panel">

              <strong>
                Admin Dashboard
              </strong>

              <p>
                Use the menu to review enquiries,
                manage appointments, update the
                advocate profile and maintain
                practice areas.
              </p>

            </div>

          </>

        )}

    </>
  );
}

export default AdminDashboardPage;