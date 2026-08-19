"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  persistConsent,
  readStoredConsent,
} from "@/lib/consent";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getClientSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) === null;
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function CookieConsent() {
  const shouldPrompt = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [forcedOpen, setForcedOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [adsChoice, setAdsChoice] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setAdsChoice(readStoredConsent()?.ads ?? false);
      setForcedOpen(true);
    }
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen);
  }, []);

  const reopened = forcedOpen && !shouldPrompt;
  if (!shouldPrompt && !forcedOpen) return null;

  const decide = (ads: boolean) => {
    persistConsent({ necessary: true, ads, decidedAt: new Date().toISOString() });
    setForcedOpen(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Ustawienia plików cookie" className="cookie-banner">
      <div className="wrap">
        <div className="cookie-banner__row">
          <p className="cookie-banner__text">
            Ta strona zapisuje w przeglądarce Twój wybór dotyczący plików cookie — to jest niezbędne do
            działania samego tego komunikatu. Po Twojej zgodzie włączymy też pomiar skuteczności kampanii
            reklamowych; bez zgody strona wygląda i działa identycznie, po prostu bez tego pomiaru. Szczegóły
            w <Link href="/polityka-cookies">polityce cookies</Link>.
          </p>
          <div className="cookie-banner__actions">
            {reopened && (
              <button type="button" className="btn btn--ghost" onClick={() => setForcedOpen(false)}>
                Zamknij
              </button>
            )}
            <button type="button" className="btn btn--ghost" onClick={() => decide(false)}>
              Tylko niezbędne
            </button>
            <button type="button" className="btn btn--primary" onClick={() => decide(true)}>
              Akceptuj wszystkie
            </button>
          </div>
        </div>

        <details
          className="cookie-banner__more"
          open={customizing}
          onToggle={(event) => setCustomizing(event.currentTarget.open)}
        >
          <summary>Dostosuj wybór</summary>
          <div className="cookie-banner__grid">
            <label className="cookie-banner__option">
              <input type="checkbox" checked disabled aria-label="Niezbędne — zawsze aktywne" />
              <span>
                <strong>Niezbędne</strong> — zapamiętują sam wybór zgody. Zawsze aktywne.
              </span>
            </label>
            <label className="cookie-banner__option">
              <input
                type="checkbox"
                checked={adsChoice}
                onChange={(event) => setAdsChoice(event.target.checked)}
              />
              <span>
                <strong>Pomiarowe / reklamowe</strong> — znacznik konwersji kampanii, uruchamiany dopiero po
                zaznaczeniu.
              </span>
            </label>
            <button type="button" className="btn btn--ghost" onClick={() => decide(adsChoice)}>
              Zapisz wybór
            </button>
          </div>
        </details>
      </div>
    </div>
  );
}
