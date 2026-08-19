export const site = {
  domain: "xelieran.site",
  url: "https://xelieran.site",
  contactEmail: "kontakt@xelieran.site",
  locale: "pl_PL",
  timeZone: "Europe/Warsaw",
} as const;

export const navLinks = [
  { href: "/jak-uczymy", label: "Jak uczymy" },
  { href: "/dla-firm", label: "Dla firm" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const legalLinks = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
] as const;
