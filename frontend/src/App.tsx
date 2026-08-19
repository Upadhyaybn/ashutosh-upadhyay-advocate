import { Route, Routes } from "react-router";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import PracticeAreasPage from "./pages/public/PracticeAreasPage";
import ContactPage from "./pages/public/ContactPage";
import EnquiryPage from "./pages/public/EnquiryPage";
import AppointmentPage from "./pages/public/AppointmentPage";

import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminEnquiriesPage from "./pages/admin/AdminEnquiriesPage";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminPracticeAreasPage from "./pages/admin/AdminPracticeAreasPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";

import NotFoundPage from "./pages/NotFoundPage";
import { ROUTES } from "./routes/routePaths";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route
          path={ROUTES.HOME}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.ABOUT}
          element={<AboutPage />}
        />

        <Route
          path={ROUTES.PRACTICE_AREAS}
          element={<PracticeAreasPage />}
        />

        <Route
          path={ROUTES.CONTACT}
          element={<ContactPage />}
        />

        <Route
          path={ROUTES.ENQUIRY}
          element={<EnquiryPage />}
        />

        <Route
          path={ROUTES.APPOINTMENT}
          element={<AppointmentPage />}
        />
      </Route>

      <Route
        path={ROUTES.ADMIN_LOGIN}
        element={<AdminLoginPage />}
      />

      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<AdminDashboardPage />}
        />

        <Route
          path="enquiries"
          element={<AdminEnquiriesPage />}
        />

        <Route
          path="appointments"
          element={<AdminAppointmentsPage />}
        />

        <Route
          path="profile"
          element={<AdminProfilePage />}
        />

        <Route
          path="practice-areas"
          element={<AdminPracticeAreasPage />}
        />

        <Route
          path="audit-logs"
          element={<AdminAuditLogsPage />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;