"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API bywa niedostępne (starsze przeglądarki, brak uprawnień) —
      // link mailto tuż obok działa niezależnie od tego przycisku.
    }
  }

  return (
    <span className="copy-btn">
      <button type="button" className="btn btn--ghost" onClick={handleCopy}>
        {copied ? "Skopiowano" : "Kopiuj adres"}
      </button>
      {copied && (
        <span className="copy-btn__status" role="status">
          {email} w schowku
        </span>
      )}
    </span>
  );
}
