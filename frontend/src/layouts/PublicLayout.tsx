import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ChatWidget from "../components/chat/ChatWidget";
import DisclaimerModal from "../components/common/DisclaimerModal";
import { useScrollReveal } from "../hooks/useScrollReveal";

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

  useScrollReveal();

  const [isDisclaimerOpen, setIsDisclaimerOpen] =
    useState(false);

  /*
   * Gates the chatbot's auto-open timer so it only starts counting
   * down once the disclaimer (if shown) has been dismissed - never
   * racing it or popping up underneath it. True immediately when
   * there's nothing to wait for (already seen this session).
   */
  const [isDisclaimerHandled, setIsDisclaimerHandled] =
    useState(false);

  /*
   * Guards against React StrictMode's development-only double
   * invocation of mount effects. Without this, the effect below can
   * run twice: the first run marks the disclaimer seen in
   * sessionStorage and opens it; the second run then reads that same
   * flag back as "already seen" and immediately marks it handled,
   * letting the chatbot's timer start right alongside the disclaimer
   * instead of after it's dismissed. Refs (unlike state) survive both
   * runs, so checking one here makes the initialization run exactly
   * once.
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
        setIsDisclaimerHandled(true);
        return;
      }

      markDisclaimerSeen();
      setIsDisclaimerOpen(true);
    }

    showDisclaimerOnFirstVisit();

  }, []);

  const handleCloseDisclaimer = () => {

    setIsDisclaimerOpen(false);
    setIsDisclaimerHandled(true);
  };

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
        onClose={handleCloseDisclaimer}
      />

      <ChatWidget
        readyForAutoOpen={isDisclaimerHandled}
      />
    </div>
  );
}

export default PublicLayout;
