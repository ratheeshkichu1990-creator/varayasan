export const SITE_NAME = "VARAYASAN";

// TODO: replace with VARAYASAN's real contact address and profile URLs.
export const CONTACT_EMAIL = "hello@varayasan.com";

/** Primary navigation (sidebar on desktop, slide-in menu on mobile). */
export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
];

/** Shown after the routes, as in Figma. Shop is not live yet, so it is not a link. */
export const NAV_EXTRAS = {
  shop: { label: "Shop", note: "(Coming Soon)" },
  contact: { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
};

export const SOCIAL_LINKS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { id: "x", label: "X", href: "https://x.com/" },
  { id: "mail", label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
];

/** About copy — placeholder text from the Figma file; replace with the real story. */
export const ABOUT = {
  eyebrow: "A little of my story",
  leadName: "Varayasan",
  lead: " is a stop motion animator and lettering artist who designs and animates food, paper, and objects. Her work is used in commercials and social media videos for worldwide brands such as Starbucks, American Express, Dunkin', Kroger, Blue Diamond, and Facebook. She also designs book covers and magazine covers.",
  body: "Becca Clason is a stop motion animator and lettering artist who designs and animates food, paper, and objects. Her work is used in commercials and social media videos for worldwide brands such as Starbucks, American Express, Dunkin', Kroger, Blue Diamond, and Facebook. She also designs book covers and magazine covers.",
};
