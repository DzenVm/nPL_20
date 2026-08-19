import Script from "next/script";

// Ładuje się zawsze (gdy skonfigurowany), niezależnie od wyboru w banerze — Consent Mode v2 wymaga obecności gtag.js, żeby mógł uszanować domyślną odmowę i przełączyć się po realnej zgodzie.
export function GoogleTag() {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`} strategy="afterInteractive" />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };
          gtag('config', ${JSON.stringify(adsId)});`}
      </Script>
    </>
  );
}
