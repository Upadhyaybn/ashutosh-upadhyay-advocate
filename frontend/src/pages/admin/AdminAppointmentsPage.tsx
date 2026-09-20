import {
  useEffect,
  useState,
} from "react";

import {
  deleteAppointment,
  getAdminAppointments,
  updateAppointmentStatus,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  AdminAppointment,
  AppointmentStatus,
} from "../../types/api";

const appointmentStatuses:
  AppointmentStatus[] = [

    "REQUESTED",
    "REVIEWED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ];

function formatStatus(
  status: string
): string {

  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase()
    );
}

function AdminAppointmentsPage() {

  const [items, setItems] =
    useState<AdminAppointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {

    let ignore = false;

    async function loadAppointments() {

      try {

        setError("");

        const data =
          await getAdminAppointments();

        if (!ignore) {
          setItems(data);
        }

      } catch (err) {

        if (!ignore) {
          setError(
            getApiErrorMessage(err)
          );
        }

      } finally {

        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadAppointments();

    return () => {
      ignore = true;
    };

  }, []);

  const handleStatusChange =
    async (
      item: AdminAppointment,
      status: AppointmentStatus
    ) => {

      if (item.status === status) {
        return;
      }

      setUpdatingId(item.id);
      setError("");
      setSuccess("");

      try {

        const updated =
          await updateAppointmentStatus(
            item.id,
            {
              status,
            }
          );

        setItems((currentItems) =>
          currentItems.map(
            (currentItem) =>
              currentItem.id === updated.id
                ? updated
                : currentItem
          )
        );

        setSuccess(
          `Appointment #${item.id} status updated to ${formatStatus(status)}.`
        );

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setUpdatingId(null);
      }
    };

  const handleDelete =
    async (
      item: AdminAppointment
    ) => {

      const confirmed =
        window.confirm(
          `Delete the appointment for "${item.fullName}"? This cannot be undone.`
        );

      if (!confirmed) {
        return;
      }

      setDeletingId(item.id);
      setError("");
      setSuccess("");

      try {

        await deleteAppointment(
          item.id
        );

        setItems((currentItems) =>
          currentItems.filter(
            (currentItem) =>
              currentItem.id !== item.id
          )
        );

        setSuccess(
          `Appointment #${item.id} deleted successfully.`
        );

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setDeletingId(null);
      }
    };

  return (
    <div>

      <div className="admin-page-header">

        <p className="eyebrow">
          Appointment Management
        </p>

        <h1>
          Appointments
        </h1>

      </div>

      {error && (

        <div className="error-message">

          <strong>
            Unable to process appointment
          </strong>

          <p>
            {error}
          </p>

        </div>
      )}

      {success && (

        <div className="success-message">

          <h2>
            Status Updated
          </h2>

          <p>
            {success}
          </p>

        </div>
      )}

      {loading && (
        <div className="admin-info-panel">
          Loading appointments...
        </div>
      )}

      {!loading &&
        items.length === 0 && (

          <div className="admin-info-panel">
            No appointments found.
          </div>

        )}

      {!loading &&
        items.length > 0 && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Matter</th>
                  <th>Communication</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {items.map(
                  (item) => (

                    <tr key={item.id}>

                      <td>
                        {item.id}
                      </td>

                      <td>
                        {item.fullName}
                      </td>

                      <td>
                        {item.mobile}
                      </td>

                      <td>
                        {item.email || "-"}
                      </td>

                      <td>
                        {item.preferredDate}
                      </td>

                      <td>
                        {
                          item.preferredTime ||
                          "-"
                        }
                      </td>

                      <td>
                        {item.matterCategory}
                      </td>

                      <td>
                        {
                          item
                            .communicationMethod
                        }
                      </td>

                      <td>

                        <select
                          className="status-select"
                          value={item.status}
                          disabled={
                            updatingId === item.id
                          }
                          onChange={(event) =>
                            void handleStatusChange(
                              item,
                              event.target
                                .value as AppointmentStatus
                            )
                          }
                        >

                          {
                            appointmentStatuses.map(
                              (status) => (

                                <option
                                  key={status}
                                  value={status}
                                >
                                  {
                                    formatStatus(
                                      status
                                    )
                                  }
                                </option>

                              )
                            )
                          }

                        </select>

                        {updatingId ===
                          item.id && (

                          <span className="status-saving">
                            Updating...
                          </span>

                        )}

                      </td>

                      <td>

                        <button
                          type="button"
                          className="button button-secondary"
                          disabled={
                            deletingId === item.id
                          }
                          onClick={() =>
                            void handleDelete(
                              item
                            )
                          }
                        >
                          {
                            deletingId === item.id
                              ? "Deleting..."
                              : "Delete"
                          }
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

    </div>
  );
}

export default AdminAppointmentsPage;