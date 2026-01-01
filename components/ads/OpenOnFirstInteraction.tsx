"use client";

import { useEffect } from "react";

type Props = {
  url: string;
  sessionKey?: string; // optional; prevents repeating in same session
};

export default function OpenOnFirstInteraction({
  url,
  sessionKey = "opened_external",
}: Props) {
  useEffect(() => {
    if (!url || typeof window === "undefined") return;
    if (sessionStorage.getItem(sessionKey)) return; // already opened this session

    const handler = () => {
      try {
        // This call happens inside a real user gesture (because triggered by event)
        window.open(url, "_blank", "noopener,noreferrer");
      } catch (e) {
        // ignore; popup might still be blocked
      } finally {
        sessionStorage.setItem(sessionKey, "1");
      }
    };

    const events: (keyof DocumentEventMap)[] = [
      "click",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((ev) =>
      document.addEventListener(ev, handler, { once: true, passive: true })
    );

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, handler));
    };
  }, [url, sessionKey]);

  return null; // no UI
}
