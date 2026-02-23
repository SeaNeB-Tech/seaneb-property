"use client";

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export default function TempUserAvatar({ size = "md", className = "" }) {
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <span
      className={`relative inline-flex ${sizeClass} items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 shadow-[0_8px_20px_var(--shadow-avatar-glow)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[68%] w-[68%] text-white">
        <circle cx="12" cy="8.5" r="3.2" fill="currentColor" />
        <path
          d="M5.5 18.5C6.2 15.7 8.7 14 12 14s5.8 1.7 6.5 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
