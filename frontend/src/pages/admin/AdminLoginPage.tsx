import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router";

import {
  loginAdmin,
} from "../../api/authApi";

import {
  removeToken,
  saveToken,
} from "../../utils/authStorage";

import {
  getApiErrorMessage,
} from "../../utils/apiError";

import {
  ROUTES,
} from "../../routes/routePaths";

function AdminLoginPage() {

  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState("");

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setLoading(true);
      setError("");

      /*
       * Remove any old/expired/bad token
       * before attempting a new login.
       */
      removeToken();

      const formData =
        new FormData(
          event.currentTarget
        );

      try {

        const response =
          await loginAdmin({

            username:
              String(
                formData.get(
                  "username"
                )
              ).trim(),

            password:
              String(
                formData.get(
                  "password"
                )
              ),
          });

        saveToken(
          response.token
        );

        navigate(
          ROUTES.ADMIN_DASHBOARD,
          {
            replace: true,
          }
        );

      } catch (err) {

        removeToken();

        setError(
          getApiErrorMessage(err)
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="admin-login-page">

      <form
        className="admin-login-card"
        onSubmit={handleSubmit}
      >

        <p className="eyebrow">
          Secure Administration
        </p>

        <h1>
          Admin Login
        </h1>

        {error && (
          <div className="error-message">

            <strong>
              Login failed
            </strong>

            <p>
              {error}
            </p>

          </div>
        )}

        <label>
          Username

          <input
            type="text"
            name="username"
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>

        <button
          type="submit"
          className="button button-primary"
          disabled={loading}
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

      </form>

    </div>
  );
}

export default AdminLoginPage;