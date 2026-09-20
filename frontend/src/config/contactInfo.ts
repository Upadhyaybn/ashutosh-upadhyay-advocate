export const CONTACT_INFO = {
  primaryPhoneDisplay: "+91 9628395566",
  primaryPhoneDigits: "+919628395566",

  alternatePhoneDisplay: "+91 9565875651",
  alternatePhoneDigits: "+919565875651",

  whatsappDisplay: "+91 9628395566",
  whatsappDigits: "919628395566",

  email: "ashutoshadvocate24@gmail.com",
} as const;

export function telHref(digits: string): string {
  return `tel:${digits}`;
}

export function whatsappHref(digits: string): string {
  return `https://wa.me/${digits}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}
