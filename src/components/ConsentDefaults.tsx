import Script from "next/script";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

// Google Consent Mode v2: domyślna odmowa ustawiona zanim załaduje się gtag.js.
export function ConsentDefaults() {
  const script = `(function(){
    var granted = false;
    try {
      var raw = window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
      if (raw) { var parsed = JSON.parse(raw); granted = parsed && parsed.ads === true; }
    } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    var state = granted ? "granted" : "denied";
    gtag("consent", "default", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
      wait_for_update: 500
    });
    gtag("js", new Date());
  })();`;

  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- App Router root layout is the documented place for beforeInteractive scripts; this rule predates the app directory.
  return <Script id="consent-defaults" strategy="beforeInteractive">{script}</Script>;
}
