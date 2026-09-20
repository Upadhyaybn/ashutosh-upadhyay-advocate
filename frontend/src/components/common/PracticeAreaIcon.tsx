import type { ReactNode } from "react";

type IconKey =
  | "civil"
  | "criminal"
  | "pocso"
  | "family"
  | "ndps"
  | "cheque"
  | "revenue"
  | "accident"
  | "government"
  | "default";

const ICON_PATHS: Record<IconKey, ReactNode> = {
  civil: (
    <>
      <path d="M10 4v12M6 16h8M4 6h12" />
      <path d="M4.5 6 3 10a1.8 1.8 0 0 0 3 0L4.5 6ZM15.5 6 14 10a1.8 1.8 0 0 0 3 0L15.5 6Z" />
    </>
  ),
  criminal: (
    <>
      <rect x="5" y="9" width="10" height="7" rx="1.5" />
      <path d="M7.5 9V6.5a2.5 2.5 0 0 1 5 0V9" />
    </>
  ),
  pocso: (
    <path d="M10 3 4 5.2v4.3c0 4 2.6 6.9 6 7.5 3.4-.6 6-3.5 6-7.5V5.2Z" />
  ),
  family: (
    <>
      <circle cx="7.5" cy="10" r="4" />
      <circle cx="12.5" cy="10" r="4" />
    </>
  ),
  ndps: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M5.5 5.5 14.5 14.5" />
    </>
  ),
  cheque: (
    <>
      <rect x="3" y="5" width="14" height="10" rx="1.2" />
      <path d="M6 9h8M6 12h5" />
    </>
  ),
  revenue: (
    <>
      <rect x="3.5" y="4" width="13" height="13" rx="1" />
      <path d="M3.5 10.5h13M10 4v13" />
    </>
  ),
  accident: (
    <>
      <path d="M4 13.5 5.2 9a2 2 0 0 1 1.9-1.4h5.8A2 2 0 0 1 14.8 9l1.2 4.5" />
      <rect x="3" y="13.5" width="14" height="3" rx="1" />
      <circle cx="6.5" cy="16.5" r="1.4" />
      <circle cx="13.5" cy="16.5" r="1.4" />
    </>
  ),
  government: (
    <>
      <path d="M3 8 10 3.5 17 8" />
      <path d="M4 8v8M8 8v8M12 8v8M16 8v8" />
      <path d="M3 16h14" />
    </>
  ),
  default: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="1.2" />
      <path d="M7 7.5h6M7 10.5h6M7 13.5h3.5" />
    </>
  ),
};

function iconKeyForName(name: string): IconKey {

  const lower = name.toLowerCase();

  if (lower.includes("pocso")) {
    return "pocso";
  }

  if (lower.includes("civil")) {
    return "civil";
  }

  if (lower.includes("crimin")) {
    return "criminal";
  }

  if (
    lower.includes("matrimonial") ||
    lower.includes("family")
  ) {
    return "family";
  }

  if (
    lower.includes("ndps") ||
    lower.includes("narcotic")
  ) {
    return "ndps";
  }

  if (
    lower.includes("negotiable") ||
    lower.includes("cheque") ||
    lower.includes("ni act")
  ) {
    return "cheque";
  }

  if (lower.includes("revenue")) {
    return "revenue";
  }

  if (
    lower.includes("accident") ||
    lower.includes("mact") ||
    lower.includes("motor")
  ) {
    return "accident";
  }

  if (
    lower.includes("government") ||
    lower.includes("authority")
  ) {
    return "government";
  }

  return "default";
}

interface PracticeAreaIconProps {
  name: string;
}

function PracticeAreaIcon({ name }: PracticeAreaIconProps) {

  const key = iconKeyForName(name);

  return (
    <span
      className="practice-area-icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 20"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICON_PATHS[key]}
      </svg>
    </span>
  );
}

export default PracticeAreaIcon;
