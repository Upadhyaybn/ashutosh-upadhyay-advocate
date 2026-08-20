import {
  useEffect,
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  getAdminProfile,
  updateAdminProfile,
} from "../../api/adminApi";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import type {
  AdvocateProfile,
} from "../../types/api";

function AdminProfilePage() {

  const [profile, setProfile] =
    useState<AdvocateProfile | null>(
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

  useEffect(() => {

    const loadProfile =
      async () => {

        try {

          const data =
            await getAdminProfile();

          setProfile(data);

        } catch (err) {

          setError(
            getApiErrorMessage(err)
          );

        } finally {

          setLoading(false);
        }
      };

    void loadProfile();

  }, []);

  const handleChange = (
    field: keyof AdvocateProfile,
    value: string
  ) => {

    if (!profile) {
      return;
    }

    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      if (!profile) {
        return;
      }

      setSaving(true);
      setError("");
      setSuccess("");

      try {

        const updated =
          await updateAdminProfile({

            fullName:
              profile.fullName,

            designation:
              profile.designation || "",

            professionalBio:
              profile.professionalBio || "",

            qualification:
              profile.qualification || "",

            courtsOfPractice:
              profile.courtsOfPractice || "",

            languages:
              profile.languages || "",

            phone:
              profile.phone || "",

            whatsapp:
              profile.whatsapp || "",

            email:
              profile.email || "",

            officeAddress:
              profile.officeAddress || "",

            officeHours:
              profile.officeHours || "",

            photoUrl:
              profile.photoUrl || "",
          });

        setProfile(updated);

        setSuccess(
          "Profile updated successfully."
        );

      } catch (err) {

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setSaving(false);
      }
    };

  if (loading) {

    return (
      <div className="admin-info-panel">
        Loading profile...
      </div>
    );
  }

  return (
    <div>

      <div className="admin-page-header">

        <p className="eyebrow">
          Profile Management
        </p>

        <h1>
          Advocate Profile
        </h1>

      </div>

      {error && (

        <div className="error-message">

          <strong>
            Unable to process profile
          </strong>

          <p>
            {error}
          </p>

        </div>
      )}

      {success && (

        <div className="success-message">

          <h2>
            Profile Updated
          </h2>

          <p>
            {success}
          </p>

        </div>
      )}

      {profile && (

        <form
          className="form-card"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <label>
              Full Name

              <input
                value={profile.fullName}
                maxLength={150}
                required
                onChange={(event) =>
                  handleChange(
                    "fullName",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Designation

              <input
                value={
                  profile.designation || ""
                }
                maxLength={100}
                onChange={(event) =>
                  handleChange(
                    "designation",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Qualification

              <input
                value={
                  profile.qualification || ""
                }
                maxLength={255}
                onChange={(event) =>
                  handleChange(
                    "qualification",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Languages

              <input
                value={
                  profile.languages || ""
                }
                maxLength={255}
                onChange={(event) =>
                  handleChange(
                    "languages",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Phone

              <input
                type="tel"
                value={
                  profile.phone || ""
                }
                maxLength={20}
                onChange={(event) =>
                  handleChange(
                    "phone",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              WhatsApp

              <input
                type="tel"
                value={
                  profile.whatsapp || ""
                }
                maxLength={20}
                onChange={(event) =>
                  handleChange(
                    "whatsapp",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Email

              <input
                type="email"
                value={
                  profile.email || ""
                }
                maxLength={150}
                onChange={(event) =>
                  handleChange(
                    "email",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Office Hours

              <input
                value={
                  profile.officeHours || ""
                }
                maxLength={255}
                onChange={(event) =>
                  handleChange(
                    "officeHours",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              Photo URL

              <input
                type="url"
                value={
                  profile.photoUrl || ""
                }
                maxLength={500}
                onChange={(event) =>
                  handleChange(
                    "photoUrl",
                    event.target.value
                  )
                }
              />
            </label>

          </div>

          <label>
            Courts of Practice

            <textarea
              rows={4}
              maxLength={2000}
              value={
                profile.courtsOfPractice ||
                ""
              }
              onChange={(event) =>
                handleChange(
                  "courtsOfPractice",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Office Address

            <textarea
              rows={4}
              maxLength={2000}
              value={
                profile.officeAddress ||
                ""
              }
              onChange={(event) =>
                handleChange(
                  "officeAddress",
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Professional Bio

            <textarea
              rows={8}
              maxLength={5000}
              value={
                profile.professionalBio ||
                ""
              }
              onChange={(event) =>
                handleChange(
                  "professionalBio",
                  event.target.value
                )
              }
            />
          </label>

          <button
            type="submit"
            className="button button-primary"
            disabled={saving}
          >
            {
              saving
                ? "Saving..."
                : "Save Profile"
            }
          </button>

        </form>
      )}

    </div>
  );
}

export default AdminProfilePage;