import { useState, useRef } from 'react'
import IsoFloor from '../IsoFloor'
import IsoBox from '../IsoBox'
import Figure from '../Figure'
import PlumbBob from '../PlumbBob'
import { iso, pts } from '../../utils/iso'

// ── Flora Tree ───────────────────────────────────
function FloraTree({ gx, gy, id, onRipple }) {
  const [glowing, setGlowing] = useState(false)
  const base = iso(gx, gy, 0)
  const t0 = iso(gx, gy, 40)
  const t1 = iso(gx, gy, 70)
  const t2 = iso(gx, gy, 100)
  const br1a = { x: t0.x-32, y: t0.y-10 }
  const br1b = { x: t0.x+28, y: t0.y+6 }
  const br2a = { x: t1.x-22, y: t1.y-18 }
  const br2b = { x: t1.x+18, y: t1.y-5 }
  const br3a = { x: t2.x-14, y: t2.y-12 }
  const obx = t2.x, oby = t2.y - 16, orbR = 22
  const pb = iso(gx, gy, 110)

  function handleClick() {
    setGlowing(true)
    setTimeout(() => setGlowing(false), 700)
    onRipple(id)
  }

  return (
    <g id={id} onClick={handleClick} data-tip="Cross-Block Flora" style={{ cursor: 'pointer' }}>
      <line x1={base.x} y1={base.y} x2={t2.x} y2={t2.y} stroke="#c8c4b4" strokeWidth={6} strokeLinecap="round" />
      <line x1={t0.x} y1={t0.y} x2={br1a.x} y2={br1a.y} stroke="#c8c4b4" strokeWidth={4} strokeLinecap="round" />
      <line x1={t0.x} y1={t0.y} x2={br1b.x} y2={br1b.y} stroke="#c8c4b4" strokeWidth={4} strokeLinecap="round" />
      <line x1={t1.x} y1={t1.y} x2={br2a.x} y2={br2a.y} stroke="#c8c4b4" strokeWidth={3} strokeLinecap="round" />
      <line x1={t1.x} y1={t1.y} x2={br2b.x} y2={br2b.y} stroke="#c8c4b4" strokeWidth={3} strokeLinecap="round" />
      <line x1={t2.x} y1={t2.y} x2={br3a.x} y2={br3a.y} stroke="#c8c4b4" strokeWidth={2.5} strokeLinecap="round" />
      {[br1a,br1b,br2a,br2b].map((p,i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#c8c4b4" />)}
      <circle cx={obx} cy={oby} r={orbR} fill="#f2f4f0" stroke="#c0c8be" strokeWidth={1.5} />
      <ellipse cx={obx} cy={oby} rx={orbR} ry={orbR * .32} fill="none" stroke="#c0c8be" strokeWidth={1} />
      <ellipse cx={obx} cy={oby} rx={orbR * .62} ry={orbR * .2} fill="none" stroke="#d0d4ce" strokeWidth=".8" />
      <line x1={obx} y1={oby - orbR} x2={obx} y2={oby + orbR} stroke="#c0c8be" strokeWidth=".8" />
      <circle cx={obx} cy={oby} r={orbR + 7} fill="none" stroke="#5db85c" strokeWidth={2.5}
        opacity={glowing ? 1 : 0} style={{ transition: 'opacity .4s' }} />
      <PlumbBob cx={pb.x} cy={pb.y - 14} />
    </g>
  )
}

// ── Spyglass ─────────────────────────────────────
function Spyglass({ onOpen }) {
  const base = iso(4.4, 3.2, 0)
  const top  = iso(4.4, 3.2, 82)
  const cx = top.x, cy = top.y, R = 38
  const pb = iso(4.4, 3.2, 130)
  return (
    <g className="clickable" onClick={() => onOpen('spyglass')} data-tip="The Urban Spyglass" style={{ cursor: 'pointer' }}>
      <IsoBox gx={4.1} gy={2.9} w={.6} d={.6} h={16} ct="#c8c8c8" cr="#aaaaaa" cl="#888888" />
      <line x1={base.x} y1={base.y-16} x2={cx} y2={cy} stroke="#888" strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={R} fill="rgba(180,210,240,.12)" stroke="#2a2a2a" strokeWidth={4} />
      <circle cx={cx} cy={cy} r={R-7} fill="rgba(140,180,220,.1)" stroke="#666" strokeWidth={1.5} />
      <line x1={cx-R+3} y1={cy} x2={cx+R-3} y2={cy} stroke="#888" strokeWidth={1.5} />
      <line x1={cx} y1={cy-R+3} x2={cx} y2={cy+R-3} stroke="#888" strokeWidth={1.5} />
      <rect x={cx-7} y={cy+R-4} width={14} height={9} rx={3} fill="#333" />
      <circle cx={cx-6} cy={cy-12} r={4} fill="rgba(120,180,240,.35)" />
      <PlumbBob cx={pb.x} cy={pb.y - 10} />
    </g>
  )
}

// ── Speaking Tubes ───────────────────────────────
function SpeakingTubes({ onOpen }) {
  const posA = iso(4.0, 1.2, 38)
  const posB = iso(1.2, 4.5, 28)
  const stA  = iso(4.0, 1.2, 0)
  const stB  = iso(1.2, 4.5, 0)
  const pb   = iso(2.5, 3, 44)

  function Horn({ cx, cy }) {
    return (
      <g transform={`translate(${cx},${cy})`}>
        <ellipse cx={0} cy={0} rx={16} ry={9} fill="#aaaaaa" stroke="#666" strokeWidth={1.2} />
        <ellipse cx={0} cy={0} rx={11} ry={6} fill="#888" />
        <ellipse cx={0} cy={0} rx={6}  ry={3.5} fill="#333" />
        <ellipse cx={0} cy={0} rx={3}  ry={1.8} fill="#111" />
      </g>
    )
  }

  return (
    <g className="clickable" onClick={() => onOpen('tubes')} data-tip="Speaking Tubes" style={{ cursor: 'pointer' }}>
      <line x1={stA.x} y1={stA.y} x2={posA.x} y2={posA.y} stroke="#777" strokeWidth={3.5} strokeLinecap="round" />
      <IsoBox gx={3.8} gy={1.0} w={.5} d={.5} h={8} ct="#bbb" cr="#999" cl="#777" />
      <line x1={stB.x} y1={stB.y} x2={posB.x} y2={posB.y} stroke="#777" strokeWidth={3.5} strokeLinecap="round" />
      <IsoBox gx={1.0} gy={4.3} w={.5} d={.5} h={8} ct="#bbb" cr="#999" cl="#777" />
      <path d={`M${posA.x},${posA.y} C${posA.x-40},${posA.y+30} ${posB.x+40},${posB.y-10} ${posB.x},${posB.y}`}
        fill="none" stroke="#777" strokeWidth={5} strokeLinecap="round" />
      <Horn cx={posA.x} cy={posA.y} />
      <Horn cx={posB.x} cy={posB.y} />
      <Figure gx={4.8} gy={1.0} flip />
      <Figure gx={0.6} gy={5.2} />
      <PlumbBob cx={pb.x} cy={pb.y} />
    </g>
  )
}

// ── Scene ────────────────────────────────────────
export default function ConnectionSquare({ onOpen }) {
  const [rippleTarget, setRippleTarget] = useState(null)

  function handleRipple(clickedId) {
    const others = ['t1','t2','t3'].filter(id => id !== clickedId)
    setRippleTarget(others[0])
    setTimeout(() => setRippleTarget(null), 700)
  }

  return (
    <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
      <IsoFloor />
      <SpeakingTubes onOpen={onOpen} />
      <FloraTree gx={1.2} gy={1.0} id="t1" onRipple={handleRipple} />
      <FloraTree gx={3.5} gy={1.5} id="t2" onRipple={handleRipple} />
      <Spyglass onOpen={onOpen} />
      <Figure gx={0.4} gy={3.5} />
    </svg>
  )
}
