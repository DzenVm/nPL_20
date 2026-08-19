export const CONSENT_STORAGE_KEY = "consent-choice";
export const CONSENT_CHANGE_EVENT = "consent-choice-changed";
export const OPEN_CONSENT_EVENT = "open-consent-settings";

export type ConsentChoice = {
  necessary: true;
  ads: boolean;
  decidedAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsentUpdate(ads: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag("consent", "update", {
    ad_storage: ads ? "granted" : "denied",
    ad_user_data: ads ? "granted" : "denied",
    ad_personalization: ads ? "granted" : "denied",
    analytics_storage: ads ? "granted" : "denied",
  });
}

export function persistConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // localStorage bywa niedostępny (tryb prywatny z zablokowanym zapisem) —
    // wybór po prostu nie przetrwa odświeżenia, ale w tej wizycie baner już się nie powtórzy.
  }
  pushConsentUpdate(choice.ads);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function readStoredConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof parsed.ads === "boolean" && typeof parsed.decidedAt === "string") {
      return { necessary: true, ads: parsed.ads, decidedAt: parsed.decidedAt };
    }
    return null;
  } catch {
    return null;
  }
}

export function readAdsConsent(): boolean {
  return readStoredConsent()?.ads === true;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
