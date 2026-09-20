import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ChatWidget from "../components/chat/ChatWidget";

function PublicLayout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />

      <ChatWidget />
    </div>
  );
}

export default PublicLayout;