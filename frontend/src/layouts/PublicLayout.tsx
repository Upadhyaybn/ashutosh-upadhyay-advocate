import { useEffect, useRef, useState } from "react";
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

  /*
   * Guards against React StrictMode's development-only double
   * invocation of mount effects. Without this, the effect below can
   * run twice: the first run marks the disclaimer seen in
   * sessionStorage and opens it; the second run then reads that same
   * flag back as "already seen" and skips opening it. Refs (unlike
   * state) survive both runs, so checking one here makes the
   * initialization run exactly once.
   */
  const hasInitializedDisclaimer =
    useRef(false);

  useEffect(() => {

    function showDisclaimerOnFirstVisit() {

      if (hasInitializedDisclaimer.current) {
        return;
      }

      hasInitializedDisclaimer.current = true;

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
