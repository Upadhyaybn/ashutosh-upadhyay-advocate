import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function PublicLayout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;