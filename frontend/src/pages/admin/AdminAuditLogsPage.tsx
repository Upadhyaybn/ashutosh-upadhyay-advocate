import {
  useEffect,
  useState,
} from "react";

import {
  getAuditLogs,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  AuditLog,
} from "../../types/api";

function AdminAuditLogsPage() {

  const [items, setItems] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const load = async () => {

      try {

        setItems(
          await getAuditLogs()
        );

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setLoading(false);
      }
    };

    void load();

  }, []);

  return (
    <div>

      <div className="admin-page-header">
        <h1>Audit Logs</h1>
      </div>

      {loading && <p>Loading...</p>}

      {error && (
        <div className="admin-info-panel">
          {error}
        </div>
      )}

      {!loading &&
        !error && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Entity ID</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>

                {items.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      {item.username}
                    </td>

                    <td>
                      {item.action}
                    </td>

                    <td>
                      {item.entityType}
                    </td>

                    <td>
                      {
                        item.entityId ?? "-"
                      }
                    </td>

                    <td>
                      {item.createdAt}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

    </div>
  );
}

export default AdminAuditLogsPage;