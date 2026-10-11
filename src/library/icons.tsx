type IconProps = { className?: string };

const base = {
  viewBox: "0 0 20 20",
  "aria-hidden": true,
  focusable: false,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PhoneIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6.3 2.8 4.4 3.3a1.6 1.6 0 0 0-1.1 1.8c1 5.4 5.3 9.7 10.7 10.7a1.6 1.6 0 0 0 1.8-1.1l.5-1.9a1 1 0 0 0-.6-1.2l-2.6-1a1 1 0 0 0-1.1.3l-.9 1.1a8.6 8.6 0 0 1-4.1-4.1l1.1-.9a1 1 0 0 0 .3-1.1l-1-2.6a1 1 0 0 0-1.2-.6Z" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="4.5" width="15" height="11" rx="1.8" />
    <path d="m3.4 5.6 6.6 5 6.6-5" />
  </svg>
);

export const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" aria-hidden focusable={false} fill="currentColor" className={className}>
    <path d="M4.2 7.4h2.6v8.4H4.2zM5.5 3.3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8.4 7.4h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4.1v4.5h-2.6v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1v4.1H8.4z" />
  </svg>
);

export const DocumentIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 2.5h6.5L15 6v11.5H5z" />
    <path d="M11.5 2.5V6H15M7.5 10h5M7.5 13h5" />
  </svg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M10 3v9.5M6.2 9l3.8 3.8L13.8 9M4 16.5h12" />
  </svg>
);

export const ExternalIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 4.5H4.5v11h11V12M11 3.5h5.5V9M16.5 3.5 9 11" />
  </svg>
);

export const GitHubIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 16 16" aria-hidden focusable={false} fill="currentColor" className={className}>
    <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4 0 .5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7 0-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.4 7.4 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.6 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 .2Z" />
  </svg>
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M16 10H4M9 5l-5 5 5 5" />
  </svg>
);

export const ArrowRightIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m5 5 10 10M15 5 5 15" />
  </svg>
);

export const BookOpenIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M10 5.5C8.4 4.3 6 3.8 3 4v11c3-.2 5.4.3 7 1.5 1.6-1.2 4-1.7 7-1.5V4c-3-.2-5.4.3-7 1.5ZM10 5.5v11" />
  </svg>
);

export const ArrowDownIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M10 4v12M5 11l5 5 5-5" />
  </svg>
);
