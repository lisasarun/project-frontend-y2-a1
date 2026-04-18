export default function LogoGraphic() {
  return (
    <svg
      className="h-10 w-10"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="logoScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="72" height="72" rx="18" fill="url(#logoGradient)" />
      <rect x="14" y="24" width="52" height="28" rx="9" fill="url(#logoScreen)" />
      <path d="M18 52H62C63.1046 52 64 51.1046 64 50V48H16V50C16 51.1046 16.8954 52 18 52Z" fill="#0f172a" opacity="0.16" />
      <path d="M26 34C26 30.6863 28.6863 28 32 28H48C51.3137 28 54 30.6863 54 34V42C54 45.3137 51.3137 48 48 48H32C28.6863 48 26 45.3137 26 42V34Z" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
      <path d="M26 34L40 24L54 34" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
      <path d="M40 24V34" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 42H52" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 38H56" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 50C22 48.8954 22.8954 48 24 48H56C57.1046 48 58 48.8954 58 50V56H22V50Z" fill="#93c5fd" />
      <path d="M24 50H56" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 42H62" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
      <path d="M40 28L46 32L40 36L34 32L40 28Z" fill="#1e3a8a" />
    </svg>
  );
}
