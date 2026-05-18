import { iso } from '../utils/iso'

export default function Figure({ gx, gy, flip = false, alpha = 1 }) {
  const b = iso(gx, gy, 0)
  const m = flip ? -1 : 1
  const x = b.x, y = b.y
  return (
    <g fill="#1a1a2e" stroke="#1a1a2e" opacity={alpha} transform={`translate(${x},${y})`}>
      <ellipse cx={m * 1} cy={-66} rx={9} ry={10} />
      <line x1={m * 1} y1={-56} x2={m * 1} y2={-52} strokeWidth={4} />
      <path d={`M${m * -7},-52 L${m * -9},-26 L${m * 11},-26 L${m * 9},-52 Z`} />
      <line x1={m * -9}  y1={-46} x2={m * -17} y2={-32} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={m * 9}   y1={-46} x2={m * 17}  y2={-32} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={m * -5}  y1={-26} x2={m * -6}  y2={-6}  strokeWidth={4}   strokeLinecap="round" />
      <line x1={m * 5}   y1={-26} x2={m * 6}   y2={-6}  strokeWidth={4}   strokeLinecap="round" />
      <ellipse cx={m * -6} cy={-4} rx={4} ry={2.5} />
      <ellipse cx={m * 6}  cy={-4} rx={4} ry={2.5} />
    </g>
  )
}
