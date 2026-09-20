import {
  useEffect,
  useId,
} from "react";

import type { ReactNode } from "react";

import CloseIcon from "./CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  closeLabel: string;
  children: ReactNode;
  footer?: ReactNode;
}

function Modal({
  isOpen,
  onClose,
  title,
  closeLabel,
  children,
  footer,
}: ModalProps) {

  const titleId = useId();

  useEffect(() => {

    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.classList.add(
      "modal-open"
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.classList.remove(
        "modal-open"
      );
    };

  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div
        className="modal-backdrop"
        onClick={onClose}
      />

      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >

        <div className="modal-header">

          <h2 id={titleId}>
            {title}
          </h2>

          <button
            type="button"
            className="modal-close-button"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <CloseIcon />
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}

      </div>

    </div>
  );
}

export default Modal;
