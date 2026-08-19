"use client";

import { openConsentSettings } from "@/lib/consent";

export function ManageCookiesButton() {
  return (
    <button type="button" onClick={openConsentSettings}>
      Zarządzaj zgodą na cookies
    </button>
  );
}
