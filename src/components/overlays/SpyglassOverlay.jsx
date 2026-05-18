import { useState, useRef, useEffect } from 'react'
import { Panel, OvHeader } from './Overlay'

const DISTRICTS = [
  { name: 'Nordstadt',  bg: '#8898a2' },
  { name: 'Eichelkamp', bg: '#a09488' },
  { name: 'Detmerode',  bg: '#909e98' },
  { name: 'Rabenberg',  bg: '#9890a0' },
  { name: 'Stadtmitte', bg: '#9898a0' },
]
const BLDGS = [[8,100,50,68],[64,68,72,100],[142,84,46,84],[196,72,50,96],[14,86,38,82]]

export default function SpyglassOverlay({ onClose }) {
  const [distIdx, setDistIdx] = useState(0)
  const [ringPos, setRingPos] = useState({ x: 130, y: 130 })
  const dragging = useRef(false)
  const vpRef = useRef(null)
  const d = DISTRICTS[distIdx]

  useEffect(() => {
    function up() { dragging.current = false }
    window.addEventListener('mouseup', up)
    return () => window.removeEventListener('mouseup', up)
  }, [])

  function onMouseMove(e) {
    if (!dragging.current || !vpRef.current) return
    const r = vpRef.current.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    setRingPos({ x, y })
    const nd = Math.min(Math.floor((x / r.width) * DISTRICTS.length), DISTRICTS.length - 1)
    setDistIdx(nd)
  }

  return (
    <Panel dark onClose={onClose}>
      <OvHeader dark>The Urban Spyglass</OvHeader>
      <div
        ref={vpRef}
        onMouseDown={() => dragging.current = true}
        onMouseMove={onMouseMove}
        style={{
          width: 260, height: 260, borderRadius: '50%',
          border: '16px solid #0d0d0d',
          boxShadow: '0 0 0 4px #2a2a2a, 0 0 0 8px #111',
          overflow: 'hidden', position: 'relative',
          margin: '0 auto 18px', cursor: 'grab',
        }}
      >
        <svg width="260" height="260" viewBox="0 0 260 260" style={{ width:'100%',height:'100%' }}>
          <filter id="sf">
            <feGaussianBlur stdDeviation="3" />
            <feColorMatrix type="saturate" values=".1" />
          </filter>
          <rect width="260" height="260" fill={d.bg} />
          <rect x="0" y="168" width="260" height="92" fill="rgba(20,20,20,.35)" filter="url(#sf)" />
          {BLDGS.map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(18,18,18,.5)" filter="url(#sf)" />
          ))}
          <text x="130" y="252" textAnchor="middle" fill="rgba(255,255,255,.4)"
            fontSize="8" letterSpacing="3" fontFamily="Helvetica Neue,sans-serif">
            {d.name.toUpperCase()}
          </text>
        </svg>
        {/* focus ring */}
        <div style={{
          position: 'absolute',
          width: 72, height: 72, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,.65)',
          left: ringPos.x, top: ringPos.y,
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          boxShadow: '0 0 14px rgba(255,255,255,.18)',
        }} />
      </div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.24em', color: '#e84855', textAlign: 'center' }}>
        — {d.name} —
      </div>
      <p style={{ fontSize: 8, color: '#333', textAlign: 'center', marginTop: 6, letterSpacing: '.14em', textTransform: 'uppercase' }}>
        Drag the focus ring to change district
      </p>
    </Panel>
  )
}
