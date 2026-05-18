export default function PlumbBob({ cx, cy }) {
  return (
    <g className="plumb" style={{ opacity: 0, transition: 'opacity .2s', pointerEvents: 'none' }}>
      <path d={`M${cx},${cy - 9} L${cx + 5},${cy - 4} L${cx},${cy + 1} L${cx - 5},${cy - 4} Z`} fill="#00e676" opacity=".9" />
      <line x1={cx} y1={cy + 1} x2={cx} y2={cy + 8} stroke="#00e676" strokeWidth="1.5" />
    </g>
  )
}
