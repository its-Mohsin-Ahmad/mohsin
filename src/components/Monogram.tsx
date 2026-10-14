import { useId } from 'react'

interface MonogramProps {
  size?: number
  className?: string
  withRing?: boolean
  /** Render as a circular avatar (used in the profile panel). */
  round?: boolean
}

/**
 * Custom MA monogram — gold gradient on a dark badge. Used for the logo and
 * avatar fallback. Pure SVG so it scales crisply and needs no external asset.
 */
export default function Monogram({
  size = 40,
  className = '',
  withRing = true,
  round = false,
}: MonogramProps) {
  const id = useId()
  const radius = round ? 32 : 14
  const ringRadius = round ? 29 : 12
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Mohsin Ahmad monogram"
    >
      <defs>
        <linearGradient id={`gold-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E7C98A" />
          <stop offset="50%" stopColor="#D9AE63" />
          <stop offset="100%" stopColor="#B8924E" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          {round ? (
            <circle cx="32" cy="32" r={radius} />
          ) : (
            <rect x="0" y="0" width="64" height="64" rx={radius} />
          )}
        </clipPath>
      </defs>
      {round ? (
        <circle cx="32" cy="32" r={radius} fill="#071014" />
      ) : (
        <rect width="64" height="64" rx={radius} fill="#071014" />
      )}
      <g clipPath={`url(#clip-${id})`}>
        {withRing &&
          (round ? (
            <circle
              cx="32"
              cy="32"
              r={ringRadius}
              fill="none"
              stroke={`url(#gold-${id})`}
              strokeWidth="1.5"
              opacity="0.55"
            />
          ) : (
            <rect
              x="3"
              y="3"
              width="58"
              height="58"
              rx={ringRadius}
              fill="none"
              stroke={`url(#gold-${id})`}
              strokeWidth="1.5"
              opacity="0.55"
            />
          ))}
        <text
          x="32"
          y={round ? 41 : 43}
          fontFamily="Manrope, Inter, sans-serif"
          fontSize={round ? 26 : 30}
          fontWeight="800"
          textAnchor="middle"
          fill={`url(#gold-${id})`}
          letterSpacing="0.5"
        >
          MA
        </text>
      </g>
    </svg>
  )
}

