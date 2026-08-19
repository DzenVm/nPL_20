import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Serif_4, Work_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentDefaults } from "@/components/ConsentDefaults";
import { GoogleTag } from "@/components/GoogleTag";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Zanim zaczniemy uczyć, ustalamy, co blokuje Twój angielski",
    template: "%s — kurs angielskiego online",
  },
  description:
    "Kurs angielskiego online dla dorosłych w Polsce, którzy już próbowali się nauczyć i utknęli. Diagnoza konkretnej bariery, małe grupy, czterotygodniowe cykle i dziennik poprawek zamiast kolejnego ogólnego programu.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    title: "Zanim zaczniemy uczyć, ustalamy, co blokuje Twój angielski",
    description:
      "Diagnoza konkretnej bariery mówienia, małe grupy dobrane pod cel, czterotygodniowe cykle nauki i dziennik poprawek — kurs angielskiego online dla dorosłych w Polsce.",
    siteName: "kurs angielskiego online",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${sourceSerif.variable} ${workSans.variable} ${plexMono.variable}`}>
      <body className="shell">
        <ConsentDefaults />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieConsent />
        <GoogleTag />
      </body>
    </html>
  );
}
