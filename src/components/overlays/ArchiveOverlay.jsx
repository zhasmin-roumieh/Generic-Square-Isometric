import { useState, useEffect, useRef } from 'react'
import { Panel, OvHeader, GhostBtn } from './Overlay'

const ITEMS = [
  { cap: 'Wolfsburg, 1952 — the factory canal, never completed', h: 210, s: 14 },
  { cap: 'Wolfsburg, 1968 — the second pedestrian bridge, proposed', h: 200, s: 10 },
  { cap: 'Wolfsburg, 1987 — never built', h: 196, s: 8 },
  { cap: 'Wolfsburg, 2003 — the underground market', h: 205, s: 12 },
  { cap: 'Wolfsburg, 2019 — the garden bridge, imagined', h: 215, s: 10 },
  { cap: 'Wolfsburg, 2047 — imagined', h: 202, s: 6 },
]
const BLDGS = [[8,96,52,72],[68,60,76,108],[148,82,48,86],[202,70,52,98],[274,80,46,98],[336,94,62,84],[406,78,48,100]]

export default function ArchiveOverlay({ onClose }) {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setInterval(() => step(1), 4500)
    return () => clearInterval(timer.current)
  }, [idx])

  function step(d) {
    clearInterval(timer.current)
    setVisible(false)
    setTimeout(() => {
      setIdx(i => (i + d + ITEMS.length) % ITEMS.length)
      setVisible(true)
    }, 200)
  }

  const a = ITEMS[idx]

  return (
    <Panel dark full onClose={onClose}>
      <OvHeader dark>The Sunken Archive</OvHeader>
      <div style={{ width: '100%', maxWidth: 520, height: 290, position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: visible ? 1 : 0, transition: 'opacity .4s' }}>
          <svg width="100%" height="290" viewBox="0 0 520 290" preserveAspectRatio="xMidYMid slice">
            <filter id="af">
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="saturate" values={a.s / 100} />
            </filter>
            <rect width="520" height="290" fill={`hsl(${a.h},${a.s}%,10%)`} />
            <rect x="0" y="178" width="520" height="112" fill={`hsl(${a.h},${a.s}%,16%)`} filter="url(#af)" />
            {BLDGS.map(([x,y,w,h],i) => (
              <rect key={i} x={x} y={y} width={w} height={h} fill={`hsl(${a.h},${a.s}%,24%)`} filter="url(#af)" />
            ))}
            {BLDGS.map(([x,y,w],i) => (
              <rect key={`r${i}`} x={x+w/2-4} y={y-12} width={8} height={14} fill={`hsl(${a.h},${a.s}%,30%)`} filter="url(#af)" />
            ))}
          </svg>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#666', fontStyle: 'italic', letterSpacing: '.08em', textAlign: 'center', marginTop: 12, maxWidth: 420 }}>
        {a.cap}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
        <GhostBtn onClick={() => step(-1)}>← Prev</GhostBtn>
        <GhostBtn onClick={() => step(1)}>Next →</GhostBtn>
      </div>
    </Panel>
  )
}
