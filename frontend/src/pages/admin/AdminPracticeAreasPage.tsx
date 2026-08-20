import {
  useEffect,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  createPracticeArea,
  deletePracticeArea,
  getAdminPracticeAreas,
  updatePracticeArea,
  updatePracticeAreaStatus,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  PracticeArea,
  PracticeAreaRequest,
} from "../../types/api";

const emptyForm:
  PracticeAreaRequest = {

    name: "",
    slug: "",
    shortDescription: "",
    detailedDescription: "",
    displayOrder: 1,
    active: true,
  };

function AdminPracticeAreasPage() {

  const [items, setItems] =
    useState<PracticeArea[]>([]);

  const [form, setForm] =
    useState<PracticeAreaRequest>(
      emptyForm
    );

  const [editingId, setEditingId] =
    useState<number | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadPracticeAreas =
    async () => {

      try {

        setError("");

        const data =
          await getAdminPracticeAreas();

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

    void loadPracticeAreas();

  }, []);

  const handleNameChange = (
    value: string
  ) => {

    const generatedSlug =
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    setForm({
      ...form,
      name: value,

      slug:
        editingId === null
          ? generatedSlug
          : form.slug,
    });
  };

  const resetForm = () => {

    setEditingId(null);

    setForm({
      ...emptyForm,
    });
  };

  const handleEdit = (
    item: PracticeArea
  ) => {

    setEditingId(
      item.id
    );

    setForm({
      name:
        item.name,

      slug:
        item.slug,

      shortDescription:
        item.shortDescription || "",

      detailedDescription:
        item.detailedDescription || "",

      displayOrder:
        item.displayOrder,

      active:
        item.active,
    });

    setSuccess("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setSaving(true);
      setSuccess("");
      setError("");

      try {

        if (editingId === null) {

          await createPracticeArea(
            form
          );

          setSuccess(
            "Practice area created successfully."
          );

        } else {

          await updatePracticeArea(
            editingId,
            form
          );

          setSuccess(
            "Practice area updated successfully."
          );
        }

        resetForm();

        await loadPracticeAreas();

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setSaving(false);
      }
    };

  const handleToggleStatus =
    async (
      item: PracticeArea
    ) => {

      setError("");
      setSuccess("");

      try {

        await updatePracticeAreaStatus(
          item.id,
          {
            active:
              !item.active,
          }
        );

        setSuccess(
          item.active
            ? "Practice area deactivated successfully."
            : "Practice area activated successfully."
        );

        await loadPracticeAreas();

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );
      }
    };

  const handleDelete =
    async (
      item: PracticeArea
    ) => {

      const confirmed =
        window.confirm(
          `Delete practice area "${item.name}"?`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");

      try {

        await deletePracticeArea(
          item.id
        );

        setSuccess(
          "Practice area deleted successfully."
        );

        if (
          editingId === item.id
        ) {
          resetForm();
        }

        await loadPracticeAreas();

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );
      }
    };

  return (
    <div>

      <div className="admin-page-header">

        <p className="eyebrow">
          Content Management
        </p>

        <h1>
          Practice Areas
        </h1>

      </div>

      {error && (

        <div className="error-message">

          <strong>
            Operation failed
          </strong>

          <p>
            {error}
          </p>

        </div>
      )}

      {success && (

        <div className="success-message">

          <h2>
            Success
          </h2>

          <p>
            {success}
          </p>

        </div>
      )}

      <form
        className="form-card"
        onSubmit={handleSubmit}
      >

        <h2>
          {
            editingId === null
              ? "Add Practice Area"
              : "Edit Practice Area"
          }
        </h2>

        <div className="form-grid">

          <label>
            Name

            <input
              value={form.name}
              maxLength={150}
              required
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Slug

            <input
              value={form.slug}
              maxLength={180}
              required
              onChange={(event) =>
                setForm({
                  ...form,
                  slug:
                    event.target.value,
                })
              }
            />
          </label>

          <label>
            Display Order

            <input
              type="number"
              min={0}
              value={
                form.displayOrder
              }
              required
              onChange={(event) =>
                setForm({
                  ...form,

                  displayOrder:
                    Number(
                      event.target.value
                    ),
                })
              }
            />
          </label>

          <label>
            Status

            <select
              value={
                form.active
                  ? "true"
                  : "false"
              }
              onChange={(event) =>
                setForm({
                  ...form,

                  active:
                    event.target.value ===
                    "true",
                })
              }
            >

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </label>

        </div>

        <label>
          Short Description

          <textarea
            rows={3}
            maxLength={500}
            value={
              form.shortDescription
            }
            onChange={(event) =>
              setForm({
                ...form,

                shortDescription:
                  event.target.value,
              })
            }
          />
        </label>

        <label>
          Detailed Description

          <textarea
            rows={7}
            maxLength={5000}
            value={
              form.detailedDescription
            }
            onChange={(event) =>
              setForm({
                ...form,

                detailedDescription:
                  event.target.value,
              })
            }
          />
        </label>

        <div className="stacked-actions">

          <button
            type="submit"
            className="button button-primary"
            disabled={saving}
          >
            {
              saving
                ? "Saving..."
                : editingId === null
                  ? "Create Practice Area"
                  : "Update Practice Area"
            }
          </button>

          {editingId !== null && (

            <button
              type="button"
              className="button button-secondary"
              onClick={resetForm}
            >
              Cancel Edit
            </button>

          )}

        </div>

      </form>

      <div
        className="admin-page-header"
        style={{
          marginTop: "40px",
        }}
      >

        <h2>
          Existing Practice Areas
        </h2>

      </div>

      {loading && (
        <div className="admin-info-panel">
          Loading practice areas...
        </div>
      )}

      {!loading &&
        items.length === 0 && (

          <div className="admin-info-panel">
            No practice areas found.
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
                  <th>Slug</th>
                  <th>Order</th>
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
                        {item.name}
                      </td>

                      <td>
                        {item.slug}
                      </td>

                      <td>
                        {
                          item.displayOrder
                        }
                      </td>

                      <td>
                        {
                          item.active
                            ? "Active"
                            : "Inactive"
                        }
                      </td>

                      <td>

                        <div className="stacked-actions">

                          <button
                            type="button"
                            className="button button-secondary"
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="button button-secondary"
                            onClick={() =>
                              void handleToggleStatus(
                                item
                              )
                            }
                          >
                            {
                              item.active
                                ? "Deactivate"
                                : "Activate"
                            }
                          </button>

                          <button
                            type="button"
                            className="button button-secondary"
                            onClick={() =>
                              void handleDelete(
                                item
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

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

export default AdminPracticeAreasPage;