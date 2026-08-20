import {
  useEffect,
  useState,
} from "react";

import {
  getAdminEnquiries,
  updateEnquiryStatus,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  AdminEnquiry,
  EnquiryStatus,
} from "../../types/api";

const enquiryStatuses: EnquiryStatus[] = [
  "NEW",
  "REVIEWED",
  "CONTACTED",
  "APPOINTMENT_SCHEDULED",
  "CLOSED",
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

function AdminEnquiriesPage() {

  const [items, setItems] =
    useState<AdminEnquiry[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadEnquiries =
    async () => {

      try {

        setError("");

        const data =
          await getAdminEnquiries();

        setItems(data);

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    void loadEnquiries();

  }, []);

  const handleStatusChange =
    async (
      item: AdminEnquiry,
      status: EnquiryStatus
    ) => {

      if (item.status === status) {
        return;
      }

      setUpdatingId(item.id);
      setError("");
      setSuccess("");

      try {

        const updated =
          await updateEnquiryStatus(
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
          `Enquiry #${item.id} status updated to ${formatStatus(status)}.`
        );

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setUpdatingId(null);
      }
    };

  return (
    <div>

      <div className="admin-page-header">

        <p className="eyebrow">
          Enquiry Management
        </p>

        <h1>
          Enquiries
        </h1>

      </div>

      {error && (

        <div className="error-message">

          <strong>
            Unable to process enquiry
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
          Loading enquiries...
        </div>
      )}

      {!loading &&
        items.length === 0 && (

          <div className="admin-info-panel">
            No enquiries found.
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
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
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
                        {item.category || "-"}
                      </td>

                      <td className="admin-table-text">
                        {item.description}
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
                                .value as EnquiryStatus
                            )
                          }
                        >

                          {enquiryStatuses.map(
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
                          )}

                        </select>

                        {updatingId ===
                          item.id && (

                          <span className="status-saving">
                            Updating...
                          </span>

                        )}

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

export default AdminEnquiriesPage;