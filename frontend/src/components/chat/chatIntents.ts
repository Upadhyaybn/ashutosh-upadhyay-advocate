export type ChatIntentId =
  | "enquiry"
  | "appointment"
  | "contact"
  | "practiceAreas";

interface ChatIntentDefinition {
  id: ChatIntentId;
  keywordsEn: string[];
  keywordsHi: string[];
}

/*
 * Deterministic keyword matching only - no external AI/LLM call.
 * Keep this list small and specific rather than trying to cover
 * every phrasing; unmatched input safely falls back to the
 * "contact the advocate" message.
 */
const INTENTS: ChatIntentDefinition[] = [
  {
    id: "appointment",
    keywordsEn: [
      "appointment",
      "book",
      "schedule",
      "meeting",
      "consult",
      "visit",
    ],
    keywordsHi: [
      "अपॉइंटमेंट",
      "मुलाकात",
      "समय",
      "बुक",
    ],
  },
  {
    id: "enquiry",
    keywordsEn: [
      "enquiry",
      "inquiry",
      "question",
      "ask",
      "query",
      "submit",
    ],
    keywordsHi: [
      "पूछताछ",
      "सवाल",
      "प्रश्न",
      "जानकारी",
    ],
  },
  {
    id: "contact",
    keywordsEn: [
      "contact",
      "phone",
      "call",
      "whatsapp",
      "email",
      "number",
      "reach",
      "address",
    ],
    keywordsHi: [
      "संपर्क",
      "फोन",
      "नंबर",
      "ईमेल",
      "व्हाट्सएप",
      "पता",
    ],
  },
  {
    id: "practiceAreas",
    keywordsEn: [
      "practice area",
      "service",
      "civil",
      "criminal",
      "family",
      "divorce",
      "property",
      "matter",
      "case",
      "pocso",
      "ndps",
      "revenue",
      "accident",
      "mact",
    ],
    keywordsHi: [
      "प्रैक्टिस",
      "सेवा",
      "मामला",
      "दीवानी",
      "फौजदारी",
      "पारिवारिक",
      "राजस्व",
    ],
  },
];

export function matchChatIntent(
  input: string
): ChatIntentId | null {

  const trimmed = input.trim();

  if (!trimmed) {
    return null;
  }

  const lowered = trimmed.toLowerCase();

  for (const intent of INTENTS) {

    const matchesEnglish =
      intent.keywordsEn.some((keyword) =>
        lowered.includes(keyword)
      );

    if (matchesEnglish) {
      return intent.id;
    }

    /*
     * Devanagari has no case distinction, so match
     * Hindi keywords against the raw (untouched) input.
     */
    const matchesHindi =
      intent.keywordsHi.some((keyword) =>
        trimmed.includes(keyword)
      );

    if (matchesHindi) {
      return intent.id;
    }
  }

  return null;
}
