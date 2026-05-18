import { useState } from 'react'
import IsoFloor from '../IsoFloor'
import IsoBox from '../IsoBox'
import Figure from '../Figure'
import PlumbBob from '../PlumbBob'
import { iso, pts } from '../../utils/iso'

const DISTRICT_PLAY_URL = 'https://zhasmin-roumieh.github.io/Game-Portal/'

// ── Sunken Archive pond ──────────────────────────
function SunkenPond({ onOpen }) {
  const tiles = []
  for (let r = 1; r < 4; r++) {
    for (let c = 1; c < 4; c++) {
      const p1=iso(c,r,-12), p2=iso(c+1,r,-12), p3=iso(c+1,r+1,-12), p4=iso(c,r+1,-12)
      const shade = `hsl(205,65%,${48+(r+c)%2*4}%)`
      tiles.push(<polygon key={`${r}-${c}`} points={pts([p1,p2,p3,p4])} fill={shade} stroke="#4a9ab8" strokeWidth=".7" />)
    }
  }
  const rim    = [iso(1,1,0),iso(4,1,0),iso(4,4,0),iso(1,4,0)]
  const wallL  = [iso(1,1,0),iso(4,1,0),iso(4,1,-12),iso(1,1,-12)]
  const wallR  = [iso(1,1,0),iso(1,4,0),iso(1,4,-12),iso(1,1,-12)]
  const center = iso(2.5, 2.5, -12)
  const pb     = iso(2.5, 2.5, 0)
  return (
    <g className="clickable" onClick={() => onOpen('archive')} data-tip="The Sunken Archive" style={{ cursor: 'pointer' }}>
      <polygon points={pts(wallL)} fill="#3a7a98" />
      <polygon points={pts(wallR)} fill="#4a8aaa" />
      {tiles}
      {[1,2,3].map(i => (
        <ellipse key={i} cx={center.x} cy={center.y} rx={i*18} ry={i*9}
          fill="none" stroke="rgba(180,230,255,.5)" strokeWidth=".8" />
      ))}
      <polygon points={pts(rim)} fill="none" stroke="#5a9ab8" strokeWidth={1.4} strokeDasharray="3,2" />
      <PlumbBob cx={pb.x} cy={pb.y - 16} />
    </g>
  )
}

// ── District Play screen ─────────────────────────
function DistrictPlay() {
  const gx=1.0, gy=0.8
  const baseC = iso(gx+0.3, gy+0.3, 0)
  const topC  = iso(gx+0.3, gy+0.3, 74)
  const sx=topC.x, sy=topC.y, sw=50, sh=34
  const cols = ['#e84855','#4a90d9','#5db85c','#ffe06a','#9b59b6']
  const pb = iso(gx+0.3, gy+0.3, 96)
  return (
    <g className="clickable" onClick={() => window.open(DISTRICT_PLAY_URL,'_blank')} data-tip="District Play" style={{ cursor: 'pointer' }}>
      <line x1={baseC.x-3} y1={baseC.y} x2={sx-3} y2={sy+sh/2+6} stroke="#444" strokeWidth={3} strokeLinecap="round" />
      <line x1={baseC.x+3} y1={baseC.y} x2={sx+3} y2={sy+sh/2+6} stroke="#444" strokeWidth={3} strokeLinecap="round" />
      <IsoBox gx={gx+0.05} gy={gy+0.05} w={.5} d={.5} h={8} ct="#aaa" cr="#888" cl="#666" />
      <rect x={sx-sw/2-3} y={sy-sh/2-3} width={sw+6} height={sh+6} rx={3} fill="#1a1a2e" stroke="#0a0a1a" strokeWidth={1} />
      <rect x={sx-sw/2} y={sy-sh/2} width={sw} height={sh} rx={1} fill="#050518" />
      {cols.map((c, i) => (
        <rect key={i} x={sx-sw/2+i*10} y={sy-sh/2+2} width={8} height={sh-4} rx={1} fill={c} opacity=".8" />
      ))}
      <polygon points={`${sx-6},${sy-7} ${sx+9},${sy} ${sx-6},${sy+7}`} fill="rgba(255,255,255,.85)" />
      <rect x={sx-sw/2-3} y={sy-4} width={3} height={8} rx={1} fill="#222" />
      <rect x={sx+sw/2}   y={sy-4} width={3} height={8} rx={1} fill="#222" />
      <PlumbBob cx={pb.x} cy={pb.y - 10} />
    </g>
  )
}

// ── Projection Board ─────────────────────────────
function ProjBoard({ onOpen }) {
  const [projGlow, setProjGlow] = useState(false)
  const gx=4.0, gy=0.8
  const baseC  = iso(gx+0.3, gy+0.3, 0)
  const boardC = iso(gx+0.3, gy+0.3, 88)
  const bx=boardC.x, by=boardC.y
  const bw=54, bh=44
  const leg = [
    { x: bx-bw/2-6, y: by+bh/2+6 },
    { x: bx+bw/2+6, y: by+bh/2+6 },
    { x: bx-4,      y: by+bh/2+14 },
  ]
  const pb = iso(gx+0.3, gy+0.3, 106)
  const chalkLines = [
    { x1: bx-18, y1: by-12, x2: bx+14, y2: by-8  },
    { x1: bx-18, y1: by-2,  x2: bx+8,  y2: by+1  },
    { x1: bx-16, y1: by+8,  x2: bx+12, y2: by+12 },
  ]
  return (
    <g className="clickable" onClick={() => onOpen('projection')} data-tip="The Projection Board" style={{ cursor: 'pointer' }}>
      {leg.map((l, i) => (
        <line key={i} x1={bx} y1={by+bh/2} x2={l.x} y2={l.y} stroke="#3a2a1a" strokeWidth={3.5} strokeLinecap="round" />
      ))}
      <line x1={bx-bw/2-2} y1={by+bh/2-6} x2={bx+bw/2+2} y2={by+bh/2-6} stroke="#3a2a1a" strokeWidth={3} strokeLinecap="round" />
      <rect x={bx-bw/2} y={by-bh/2} width={bw} height={bh} rx={1} fill="#14221a" stroke="#2a3a28" strokeWidth={2} />
      {chalkLines.map((l, i) => (
        <line key={i} {...l} stroke="rgba(220,240,200,.7)" strokeWidth={1.8 - i * 0.3} />
      ))}
      <rect x={bx-bw/2} y={by-bh/2} width={bw} height={bh} rx={1}
        fill="rgba(126,207,239,.3)" opacity={projGlow ? 1 : 0}
        style={{ transition: 'opacity .6s' }} />
      <rect x={bx-bw/2} y={by+bh/2-7} width={bw} height={6} rx={1} fill="#1e3024" stroke="#2a4030" strokeWidth=".8" />
      <Figure gx={gx-1.1} gy={gy+0.5} />
      <PlumbBob cx={pb.x} cy={pb.y - 10} />
    </g>
  )
}

// ── Scene ────────────────────────────────────────
export default function SpeculationSquare({ onOpen }) {
  return (
    <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
      <IsoFloor />
      <SunkenPond onOpen={onOpen} />
      <DistrictPlay />
      <ProjBoard onOpen={onOpen} />
      <Figure gx={5.2} gy={4.5} flip />
    </svg>
  )
}
