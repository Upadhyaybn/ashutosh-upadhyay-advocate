import type { FormEvent } from "react";

function AdminLoginPage() {
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    alert(
      "Authentication will be connected in Phase 18."
    );
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

        <h1>Admin Login</h1>

        <label>
          Username
          <input
            name="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            required
          />
        </label>

        <button
          type="submit"
          className="button button-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;