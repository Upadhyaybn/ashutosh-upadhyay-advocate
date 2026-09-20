import { useEffect } from "react";

const REVEAL_SELECTOR = ".main-content .section";

/**
 * Fades/rises .section elements into view as they scroll into the
 * viewport. Scoped to .main-content so it never touches the header,
 * footer, modal, or chat widget. No-ops entirely under
 * prefers-reduced-motion so those users never see the initial
 * hidden state.
 */
export function useScrollReveal(): void {

  useEffect(() => {

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {

        for (const entry of entries) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-revealed"
            );

            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    const observed = new Set<Element>();

    const scan = () => {

      document
        .querySelectorAll(REVEAL_SELECTOR)
        .forEach((el) => {

          if (observed.has(el)) {
            return;
          }

          observed.add(el);

          el.classList.add("scroll-reveal");

          observer.observe(el);
        });
    };

    scan();

    const mainContent =
      document.querySelector(".main-content") ??
      document.body;

    const mutationObserver = new MutationObserver(
      scan
    );

    mutationObserver.observe(mainContent, {
      childList: true,
      subtree: true,
    });

    return () => {

      observer.disconnect();
      mutationObserver.disconnect();
    };

  }, []);
}
