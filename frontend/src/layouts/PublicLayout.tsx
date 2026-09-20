import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import DisclaimerModal from "../components/common/DisclaimerModal";

const DISCLAIMER_SESSION_KEY =
  "advocate-disclaimer-shown";

function hasSeenDisclaimerThisSession(): boolean {

  try {

    return (
      window.sessionStorage.getItem(
        DISCLAIMER_SESSION_KEY
      ) === "true"
    );

  } catch {

    return false;
  }
}

function markDisclaimerSeen(): void {

  try {

    window.sessionStorage.setItem(
      DISCLAIMER_SESSION_KEY,
      "true"
    );

  } catch {
    // sessionStorage unavailable - shows every visit instead.
  }
}

function PublicLayout() {

  const [isDisclaimerOpen, setIsDisclaimerOpen] =
    useState(false);

  useEffect(() => {

    function showDisclaimerOnFirstVisit() {

      if (hasSeenDisclaimerThisSession()) {
        return;
      }

      markDisclaimerSeen();
      setIsDisclaimerOpen(true);
    }

    showDisclaimerOnFirstVisit();

  }, []);

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer
        onOpenDisclaimer={() =>
          setIsDisclaimerOpen(true)
        }
      />

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() =>
          setIsDisclaimerOpen(false)
        }
      />
    </div>
  );
}

export default PublicLayout;
