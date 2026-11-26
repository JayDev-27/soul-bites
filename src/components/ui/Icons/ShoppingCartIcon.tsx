export function ShoppingCartIcon({
  size = 24,
  color = "currentColor",
  glow = false,
  className = "",
}: {
  size?: number;
  color?: string;
  glow?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={
        glow
          ? { filter: "drop-shadow(0 0 5px var(--color-golden-yellow))" }
          : undefined
      }
    >
      <path d="M2 3h3l3 12h11l3-9H6M9 6v9m5-9v9m5-9-1 9" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}
