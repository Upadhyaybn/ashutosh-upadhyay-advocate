import { useTranslation } from "react-i18next";

import Modal from "./Modal";

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
 * DRAFT CONTENT - FOR ADVOCATE/LEGAL REVIEW BEFORE PRODUCTION.
 *
 * The English/Hindi copy for this disclaimer lives in
 * frontend/src/i18n/locales/{en,hi}.json under the "disclaimer" key.
 * It was drafted to cover the topics requested (general information
 * only, not legal advice, no advocate-client relationship from
 * browsing, outcomes depend on individual facts, the chatbot is
 * automated, electronic-communication privacy limitations) but has
 * NOT been legally vetted. Please review and edit that wording
 * yourself before this ships to production.
 */
function DisclaimerModal({
  isOpen,
  onClose,
}: DisclaimerModalProps) {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("disclaimer.title")}
      closeLabel={t("disclaimer.acknowledge")}
      footer={
        <button
          type="button"
          className="button button-primary"
          onClick={onClose}
        >
          {t("disclaimer.acknowledge")}
        </button>
      }
    >

      <p>
        {t("disclaimer.paragraph1")}
      </p>

      <p>
        {t("disclaimer.paragraph2")}
      </p>

      <p>
        {t("disclaimer.paragraph3")}
      </p>

      <p>
        {t("disclaimer.paragraph4")}
      </p>

      <p>
        {t("disclaimer.paragraph5")}
      </p>

    </Modal>
  );
}

export default DisclaimerModal;
