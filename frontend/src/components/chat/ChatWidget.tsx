import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  FormEvent,
  ReactNode,
} from "react";

import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import ContactAction
  from "../common/ContactAction";

import {
  CONTACT_INFO,
  mailtoHref,
  telHref,
  whatsappHref,
} from "../../config/contactInfo";

import {
  practiceAreas,
} from "../../data/practiceAreas";

import { ROUTES } from "../../routes/routePaths";

import {
  matchChatIntent,
} from "./chatIntents";

import type {
  ChatIntentId,
} from "./chatIntents";

type TimeGreeting = "morning" | "afternoon" | "evening";

/*
 * Messages store WHAT to say, not pre-rendered translated text, so
 * that switching the site language re-translates the entire chat
 * history (including messages sent earlier in the session) rather
 * than freezing old messages in whatever language was active when
 * they were added.
 */
type ChatMessageDescriptor =
  | { kind: "botGreeting"; timeGreeting: TimeGreeting }
  | { kind: "botGreetingPrompt" }
  | { kind: "botIntentResponse"; intent: ChatIntentId }
  | { kind: "botFallback" }
  | { kind: "userQuickReply"; intent: ChatIntentId }
  | { kind: "userFreeText"; text: string };

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  descriptor: ChatMessageDescriptor;
}

const AUTO_OPEN_DELAY_MS = 2500;
const AUTO_OPEN_SESSION_KEY =
  "advocate-chat-auto-opened";

function getTimeGreeting(): TimeGreeting {

  const hour = new Date().getHours();

  if (hour < 12) {
    return "morning";
  }

  if (hour < 17) {
    return "afternoon";
  }

  return "evening";
}

function hasAutoOpenedThisSession(): boolean {

  try {

    return (
      window.sessionStorage.getItem(
        AUTO_OPEN_SESSION_KEY
      ) === "true"
    );

  } catch {

    return false;
  }
}

function markAutoOpenedThisSession(): void {

  try {

    window.sessionStorage.setItem(
      AUTO_OPEN_SESSION_KEY,
      "true"
    );

  } catch {
    // sessionStorage unavailable - auto-open every visit instead.
  }
}

function ChatIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TypingIndicator() {

  return (
    <span className="chat-typing-dots">
      <span />
      <span />
      <span />
    </span>
  );
}

function ChatWidget() {

  const { t } = useTranslation();
  const panelId = useId();

  const [isOpen, setIsOpen] =
    useState(false);

  const [hasGreeted, setHasGreeted] =
    useState(false);

  const [isTyping, setIsTyping] =
    useState(false);

  const [inputValue, setInputValue] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const pendingTimers =
    useRef<number[]>([]);

  useEffect(() => {

    const timers = pendingTimers.current;

    return () => {

      timers.forEach((timer) =>
        window.clearTimeout(timer)
      );
    };

  }, []);

  const addBotMessage = (
    descriptor: ChatMessageDescriptor,
    delayMs = 550
  ) => {

    setIsTyping(true);

    const timer = window.setTimeout(() => {

      setIsTyping(false);

      setMessages((current) => [
        ...current,
        {
          id: `bot-${current.length}-${Date.now()}`,
          sender: "bot",
          descriptor,
        },
      ]);

    }, delayMs);

    pendingTimers.current.push(timer);
  };

  const addUserMessage = (
    descriptor: ChatMessageDescriptor
  ) => {

    setMessages((current) => [
      ...current,
      {
        id: `user-${current.length}-${Date.now()}`,
        sender: "user",
        descriptor,
      },
    ]);
  };

  const respondToIntent = (
    intent: ChatIntentId | null
  ) => {

    if (intent) {

      addBotMessage({
        kind: "botIntentResponse",
        intent,
      });

      return;
    }

    addBotMessage({ kind: "botFallback" });
  };

  const greet = () => {

    if (hasGreeted) {
      return;
    }

    setHasGreeted(true);

    addBotMessage(
      {
        kind: "botGreeting",
        timeGreeting: getTimeGreeting(),
      },
      450
    );

    const promptTimer =
      window.setTimeout(() => {

        addBotMessage(
          { kind: "botGreetingPrompt" },
          500
        );

      }, 900);

    pendingTimers.current.push(
      promptTimer
    );
  };

  const handleOpen = () => {

    setIsOpen(true);
    greet();
  };

  useEffect(() => {

    if (hasAutoOpenedThisSession()) {
      return undefined;
    }

    const timer = window.setTimeout(() => {

      markAutoOpenedThisSession();
      setIsOpen(true);
      greet();

    }, AUTO_OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);

    // Runs once on mount only - an intentional
    // one-time auto-open, not tied to prop/state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuickReply = (
    intent: ChatIntentId
  ) => {

    addUserMessage({
      kind: "userQuickReply",
      intent,
    });

    respondToIntent(intent);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    addUserMessage({
      kind: "userFreeText",
      text: trimmed,
    });

    respondToIntent(
      matchChatIntent(trimmed)
    );

    setInputValue("");
  };

  const renderIntentResponse = (
    intent: ChatIntentId
  ): ReactNode => {

    if (intent === "enquiry") {

      return (
        <>
          <p>
            {t("chat.responses.enquiry")}
          </p>

          <Link
            className="button button-secondary chat-action-button"
            to={ROUTES.ENQUIRY}
          >
            {t("chat.goToEnquiry")}
          </Link>
        </>
      );
    }

    if (intent === "appointment") {

      return (
        <>
          <p>
            {t("chat.responses.appointment")}
          </p>

          <Link
            className="button button-secondary chat-action-button"
            to={ROUTES.APPOINTMENT}
          >
            {t("chat.goToAppointment")}
          </Link>
        </>
      );
    }

    if (intent === "contact") {

      return (
        <>
          <p>
            {t("chat.responses.contact")}
          </p>

          <div className="chat-contact-actions">

            <ContactAction
              type="phone"
              label={t("common.contact.primaryContact")}
              value={CONTACT_INFO.primaryPhoneDisplay}
              href={telHref(CONTACT_INFO.primaryPhoneDigits)}
            />

            <ContactAction
              type="whatsapp"
              label={t("common.contact.whatsapp")}
              value={CONTACT_INFO.whatsappDisplay}
              href={whatsappHref(CONTACT_INFO.whatsappDigits)}
            />

            <ContactAction
              type="email"
              label={t("common.contact.email")}
              value={CONTACT_INFO.email}
              href={mailtoHref(CONTACT_INFO.email)}
            />

          </div>
        </>
      );
    }

    return (
      <>
        <p>
          {t("chat.responses.practiceAreasIntro")}
        </p>

        <ul className="chat-practice-area-list">

          {practiceAreas.map((area) => (

            <li key={area.id}>
              {t(
                `practiceAreaItems.${area.id}.title`,
                { defaultValue: area.title }
              )}
            </li>

          ))}

        </ul>

        <Link
          className="button button-secondary chat-action-button"
          to={ROUTES.PRACTICE_AREAS}
        >
          {t("chat.goToPracticeAreas")}
        </Link>
      </>
    );
  };

  const renderMessage = (
    descriptor: ChatMessageDescriptor
  ): ReactNode => {

    switch (descriptor.kind) {

      case "botGreeting":

        return (
          <p className="chat-message-greeting">
            <span className="chat-greeting-highlight">
              {t(
                `chat.timeGreeting.${descriptor.timeGreeting}`
              )}!
            </span>{" "}
            {t("chat.greeting")}
          </p>
        );

      case "botGreetingPrompt":

        return (
          <p className="chat-message-greeting-prompt">
            {t("chat.greetingPrompt")}
          </p>
        );

      case "botIntentResponse":

        return renderIntentResponse(
          descriptor.intent
        );

      case "botFallback":

        return (
          <p>
            {t("chat.responses.fallback")}
          </p>
        );

      case "userQuickReply":

        return t(
          `chat.quickReplies.${descriptor.intent}`
        );

      case "userFreeText":

        return descriptor.text;

      default:

        return null;
    }
  };

  return (
    <div className="chat-widget">

      {isOpen && (

        <div
          className="chat-panel"
          role="dialog"
          aria-label={t("chat.title")}
          id={panelId}
        >

          <div className="chat-panel-header">

            <div>

              <p className="chat-panel-title">
                {t("chat.title")}
              </p>

              <p className="chat-panel-disclaimer">
                {t("chat.disclaimer")}
              </p>

            </div>

            <button
              type="button"
              className="chat-close-button"
              aria-label={t("chat.launcherClose")}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </button>

          </div>

          <div
            className="chat-messages"
            aria-live="polite"
          >

            {messages.map((message) => (

              <div
                key={message.id}
                className={
                  message.sender === "bot"
                    ? "chat-message chat-message-bot"
                    : "chat-message chat-message-user"
                }
              >
                {renderMessage(
                  message.descriptor
                )}
              </div>

            ))}

            {isTyping && (

              <div
                className="chat-message chat-message-bot chat-message-typing"
                aria-label={t("chat.typingLabel")}
              >
                <TypingIndicator />
              </div>

            )}

          </div>

          <div className="chat-quick-replies">

            <button
              type="button"
              className="chat-quick-reply"
              onClick={() =>
                handleQuickReply("appointment")
              }
            >
              {t("chat.quickReplies.appointment")}
            </button>

            <button
              type="button"
              className="chat-quick-reply"
              onClick={() =>
                handleQuickReply("enquiry")
              }
            >
              {t("chat.quickReplies.enquiry")}
            </button>

            <button
              type="button"
              className="chat-quick-reply"
              onClick={() =>
                handleQuickReply("contact")
              }
            >
              {t("chat.quickReplies.contact")}
            </button>

            <button
              type="button"
              className="chat-quick-reply"
              onClick={() =>
                handleQuickReply("practiceAreas")
              }
            >
              {t("chat.quickReplies.practiceAreas")}
            </button>

          </div>

          <form
            className="chat-input-row"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              value={inputValue}
              placeholder={t("chat.inputPlaceholder")}
              aria-label={t("chat.inputPlaceholder")}
              onChange={(event) =>
                setInputValue(
                  event.target.value
                )
              }
            />

            <button
              type="submit"
              className="button button-primary"
            >
              {t("chat.send")}
            </button>

          </form>

        </div>

      )}

      <button
        type="button"
        className={
          hasGreeted
            ? "chat-launcher"
            : "chat-launcher chat-launcher-attention"
        }
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={
          isOpen
            ? t("chat.launcherClose")
            : t("chat.launcherOpen")
        }
        onClick={() =>
          isOpen
            ? setIsOpen(false)
            : handleOpen()
        }
      >
        {isOpen
          ? <CloseIcon />
          : <ChatIcon />}
      </button>

    </div>
  );
}

export default ChatWidget;
