type CartoonPersonProps = {
  label?: string;
  mood?: "smile" | "calm" | "wave";
  className?: string;
};

export function CartoonPerson({ label = "ตัวการ์ตูนพยาบาล", mood = "smile", className }: CartoonPersonProps) {
  const mouth = mood === "wave" ? "M20 29 Q24 32 28 29" : mood === "calm" ? "M19 29 Q24 31 29 29" : "M18 28 Q24 33 30 28";
  const eyeOffset = mood === "calm" ? 1 : 0;

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={label}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skin" x1="16" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8D7C0" />
          <stop offset="1" stopColor="#F1B995" />
        </linearGradient>
        <linearGradient id="shirt" x1="18" y1="28" x2="46" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#edf7ff" />
        </linearGradient>
        <linearGradient id="accent" x1="18" y1="34" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ec8ff" />
          <stop offset="1" stopColor="#239884" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#F4FBF8" />
      <circle cx="32" cy="25" r="11" fill="url(#skin)" />
      <path d="M20 24C21 17 26 13 32 13C38 13 43 17 44 24" fill="#2F4A45" />
      <path d="M22 21C24 18 27 16 30 16" stroke="#2F4A45" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 16C37 16 40 18 42 21" stroke="#2F4A45" strokeWidth="2" strokeLinecap="round" />
      <circle cx={27} cy={26 + eyeOffset} r="1.7" fill="#264040" />
      <circle cx={37} cy={26 + eyeOffset} r="1.7" fill="#264040" />
      <path d={mouth} stroke="#264040" strokeWidth="2" strokeLinecap="round" />

      <path d="M18 34C22 31 26 30 32 30C38 30 42 31 46 34V52H18V34Z" fill="url(#shirt)" />
      <path d="M21 35C24 33 28 32 32 32C36 32 40 33 43 35" stroke="url(#accent)" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 36V52" stroke="#DDEEFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 36V52" stroke="#DDEEFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 33H45" stroke="#239884" strokeWidth="2" strokeLinecap="round" />

      <path d="M22 14H42C43 14 44 15 44 16V19C44 20 43 21 42 21H22C21 21 20 20 20 19V16C20 15 21 14 22 14Z" fill="#ffffff" stroke="#cde3f4" strokeWidth="1.5" />
      <path d="M27 17H37" stroke="#239884" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 14V20" stroke="#239884" strokeWidth="2.5" strokeLinecap="round" />

      <path d="M14 38C16 34 18 33 21 32" stroke="#8FD3FF" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 38C48 34 46 33 43 32" stroke="#8FD3FF" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 52C22 56 27 58 32 58C37 58 42 56 45 52" stroke="#1E7265" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
