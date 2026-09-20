import type { ReactNode } from "react";

type ContactActionType = "phone" | "whatsapp" | "email";

interface ContactActionProps {
  type: ContactActionType;
  label: string;
  value: string;
  href: string;
}

const ICON_PATHS: Record<ContactActionType, ReactNode> = {
  phone: (
    <path
      d="M6.5 3h2.4l1.2 3.6-1.7 1.3a10.6 10.6 0 0 0 4.7 4.7l1.3-1.7 3.6 1.2v2.4c0 1-.8 1.7-1.7 1.6A15.3 15.3 0 0 1 4.9 4.7C4.8 3.8 5.5 3 6.5 3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <path
      d="M10 3.3a6.7 6.7 0 0 0-5.7 10.2L3.3 16.7l3.3-1a6.7 6.7 0 1 0 3.4-12.4Zm3.3 9.4c-.1.4-.8.8-1.2.8-.3 0-.7 0-2.2-.6a7.6 7.6 0 0 1-3.4-3.4c-.6-1.5-.6-1.9-.6-2.2 0-.4.4-1.1.8-1.2q.25-.1.5.1l.9 1.3c.1.1.1.3 0 .5l-.4.6c-.1.2-.1.4 0 .5.5 1 1.4 1.9 2.4 2.4q.25.15.5 0l.6-.4c.1-.1.3-.1.5 0l1.3.9q.2.25.1.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  email: (
    <path
      d="M3.5 5.5h13v9h-13Zm0 0 6.5 5.5 6.5-5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

function ContactAction({
  type,
  label,
  value,
  href,
}: ContactActionProps) {

  const isExternal = type === "whatsapp";

  return (
    <a
      className="contact-action"
      href={href}
      aria-label={`${label}: ${value}`}
      {...(isExternal
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      <span
        className="contact-action-icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 20 20"
          width="20"
          height="20"
        >
          {ICON_PATHS[type]}
        </svg>
      </span>

      <span className="contact-action-value">
        {value}
      </span>
    </a>
  );
}

export default ContactAction;
