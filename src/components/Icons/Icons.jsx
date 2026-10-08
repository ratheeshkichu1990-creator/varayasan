/* Icon set used in the Figma file (Iconify: ic, uil, mdi, material-symbols, ri, bx). */
const filled = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, focusable: false };
const stroked = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const FacebookIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

export const InstagramIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.6 7.6 0 0 0-.46-2.43a4.9 4.9 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.8 4.8 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.8 4.8 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.9 4.9 0 0 0 1.16-1.77a7.6 7.6 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.6 5.6 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.2 3.2 0 0 1-1.15.75a5.6 5.6 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.7 5.7 0 0 1-1.94-.3a3.3 3.3 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.5 5.5 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.5 5.5 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.1 3.1 0 0 1 1.1-.8A5.7 5.7 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.6 5.6 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.1 3.1 0 0 1 .75 1.1a5.6 5.6 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z" />
  </svg>
);

export const XIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.34l4.37 5.78L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M4 20q-.83 0-1.41-.59T2 18V6q0-.83.59-1.41T4 4h16q.83 0 1.41.59T22 6v12q0 .83-.59 1.41T20 20H4Zm8-7l8-5V6l-8 5l-8-5v2l8 5Z" />
  </svg>
);

export const YoutubeIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);

export const MenuIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M3 4h18v2H3V4Zm0 7h18v2H3v-2Zm0 7h18v2H3v-2Z" />
  </svg>
);

export const GridIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M7 7h4.5v4.5H7zm5.5 0H17v4.5h-4.5zM7 12.5h4.5V17H7zm5.5 0H17V17h-4.5z" />
  </svg>
);

export const ListIcon = (p) => (
  <svg {...filled} {...p}>
    <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.02v2H20zM8 11h12v2H8zm0 5h12v2H8z" />
  </svg>
);

export const CloseIcon = (p) => (
  <svg {...stroked} {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const ChevronIcon = ({ direction = "right", ...p }) => (
  <svg {...stroked} {...p} style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}>
    <path d="M9 4l8 8-8 8" />
  </svg>
);

export const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  mail: MailIcon,
  youtube: YoutubeIcon,
};
