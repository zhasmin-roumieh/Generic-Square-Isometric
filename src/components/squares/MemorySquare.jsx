import { useRef, useState } from 'react'
import IsoFloor from '../IsoFloor'
import IsoBox from '../IsoBox'
import Figure from '../Figure'
import PlumbBob from '../PlumbBob'
import { iso, pts } from '../../utils/iso'

// ── Ghost Steps ─────────────────────────────────
function GhostSteps({ onOpen }) {
  const [active, setActive] = useState(false)
  const [showTs, setShowTs] = useState(false)

  const fpTiles = [[1,2],[2,2],[2,3],[3,3],[3,4],[4,4],[4,3]]
  const fpMarks = [[1.6,2.3],[2.1,2.8],[2.7,3.2],[3.2,3.7],[3.8,3.5],[4.2,3.0]]
  const pb = iso(3, 3, 0)

  function trigger() {
    setActive(true)
    setShowTs(false)
    setTimeout(() => setShowTs(true), 900)
    setTimeout(() => { setShowTs(false); setActive(false) }, 4200)
  }

  return (
    <g className="clickable" onClick={trigger} data-tip="Ghost Steps" style={{ cursor: 'pointer' }}>
      {fpTiles.map(([c, r], i) => {
        const p1=iso(c,r,-1), p2=iso(c+1,r,-1), p3=iso(c+1,r+1,-1), p4=iso(c,r+1,-1)
        return (
          <polygon key={i} points={pts([p1,p2,p3,p4])}
            fill="#7ecfef"
            opacity={active ? .65 : .18}
            style={{ transition: 'opacity .4s' }}
            stroke="none"
          />
        )
      })}
      {fpMarks.map(([gx, gy], i) => {
        const pos = iso(gx, gy, 2)
        return (
          <g key={i}>
            <ellipse cx={pos.x-5} cy={pos.y} rx={4} ry={2.5}
              fill="#7ecfef" opacity={active ? .85 : .2} style={{ transition: 'opacity .4s' }}/>
            <ellipse cx={pos.x+5} cy={pos.y+4} rx={4} ry={2.5}
              fill="#7ecfef" opacity={active ? .85 : .2} style={{ transition: 'opacity .4s' }}/>
          </g>
        )
      })}
      <Figure gx={2.2} gy={1.2} />
      <Figure gx={3.8} gy={2.2} flip alpha={0.45} />
      <PlumbBob cx={pb.x} cy={pb.y - 80} />
      {showTs && (
        <g style={{ opacity: showTs ? 1 : 0, transition: 'opacity .5s' }}>
          <rect x={110} y={350} width={280} height={24} rx={2} fill="rgba(10,12,24,.85)" />
          <text x={250} y={366} textAnchor="middle" fill="#7ecfef" fontSize={9.5}
            fontFamily="Helvetica Neue,sans-serif" letterSpacing={1.8}>
            Someone was here 1 hour ago
          </text>
        </g>
      )}
    </g>
  )
}

// ── Open Letter ──────────────────────────────────
function OpenLetter({ onOpen }) {
  const gx=4.2, gy=0.8
  const q = (x, y, z) => iso(gx+x, gy+y, z)
  const w=1.2, d=0.8, h=60
  const top  = [q(0,0,h),q(w,0,h),q(w,d,h),q(0,d,h)]
  const rgt  = [q(w,0,h),q(w,d,h),q(w,d,0),q(w,0,0)]
  const lft  = [q(0,d,h),q(w,d,h),q(w,d,0),q(0,d,0)]
  const hr1  = [q(0,d,h/3),q(w,d,h/3)]
  const hr2  = [q(0,d,2*h/3),q(w,d,2*h/3)]
  const vr   = [q(w/2,d,0),q(w/2,d,h)]
  const sl0  = q(0.1,d,h*.6), sl1 = q(w-.1,d,h*.6)
  const pb   = q(w/2,d/2,h)
  return (
    <g className="clickable" onClick={() => onOpen('letter')} data-tip="The Open Letter" style={{ cursor: 'pointer' }}>
      <polygon points={pts(lft)} fill="#1a1a2e" stroke="#0a0a1a" strokeWidth=".8" />
      <polygon points={pts(rgt)} fill="#252535" stroke="#0a0a1a" strokeWidth=".8" />
      <polygon points={pts(top)} fill="#2e2e48" stroke="#3a3a5a" strokeWidth=".8" />
      <line x1={hr1[0].x} y1={hr1[0].y} x2={hr1[1].x} y2={hr1[1].y} stroke="#3a3a5a" strokeWidth={1} />
      <line x1={hr2[0].x} y1={hr2[0].y} x2={hr2[1].x} y2={hr2[1].y} stroke="#3a3a5a" strokeWidth={1} />
      <line x1={vr[0].x}  y1={vr[0].y}  x2={vr[1].x}  y2={vr[1].y}  stroke="#3a3a5a" strokeWidth={1} />
      <line x1={sl0.x} y1={sl0.y} x2={sl1.x} y2={sl1.y} stroke="#e84855" strokeWidth={2.5} />
      <PlumbBob cx={pb.x} cy={pb.y - 10} />
    </g>
  )
}

// ── Stranger's Frame ─────────────────────────────
function StrangersFrame({ onOpen }) {
  const gx=0.8, gy=3.8
  const baseC = iso(gx+0.4, gy+0.2, 0)
  const frameC = iso(gx+0.4, gy+0.2, 78)
  const bx=frameC.x, by=frameC.y
  const fw=40, fh=55
  const dot = iso(gx+0.1, gy+0.6, 16)
  const pb  = iso(gx+0.4, gy+0.2, 90)
  return (
    <g className="clickable" onClick={() => onOpen('polaroid')} data-tip="The Stranger's Frame" style={{ cursor: 'pointer' }}>
      <line x1={baseC.x-8} y1={baseC.y} x2={bx-5} y2={by+fh/2+4} stroke="#1a1a2e" strokeWidth={3} strokeLinecap="round" />
      <line x1={baseC.x+8} y1={baseC.y} x2={bx+5} y2={by+fh/2+4} stroke="#1a1a2e" strokeWidth={3} strokeLinecap="round" />
      <rect x={bx-fw/2} y={by-fh/2} width={fw} height={fh} rx={1} fill="#f0ede8" stroke="#1a1a2e" strokeWidth={3} />
      <rect x={bx-fw/2+4} y={by-fh/2+4} width={fw-8} height={fh-8} rx={1} fill="#e8e4de" stroke="#888" strokeWidth=".8" />
      <ellipse cx={bx} cy={by-8} rx={8} ry={9} fill="#1a1a2e" opacity=".35" />
      <path d={`M${bx-8},${by} L${bx-9},${by+20} L${bx+9},${by+20} L${bx+8},${by} Z`} fill="#1a1a2e" opacity=".35" />
      <circle cx={dot.x} cy={dot.y} r={5} fill="#e84855" />
      <Figure gx={gx-1.2} gy={gy+0.6} />
      <line x1={bx} y1={by-fh/2} x2={bx+5} y2={by-fh/2-14} stroke="#888" strokeWidth={1.2} strokeDasharray="2,2" />
      <PlumbBob cx={pb.x} cy={pb.y - 10} />
    </g>
  )
}

// ── Scene ────────────────────────────────────────
export default function MemorySquare({ onOpen }) {
  return (
    <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
      <IsoFloor />
      <GhostSteps />
      <OpenLetter onOpen={onOpen} />
      <StrangersFrame onOpen={onOpen} />
    </svg>
  )
}
