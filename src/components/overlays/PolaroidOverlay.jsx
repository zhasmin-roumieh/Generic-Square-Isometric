import { useState } from 'react'
import { Panel, OvHeader, Btn } from './Overlay'

const STRANGERS = [
  { name: 'Maria K.',   district: 'Nordstadt',  note: 'Seen at Berliner Brücke, 14:32' },
  { name: 'Unknown',    district: 'Eichelkamp', note: 'Near the autostadt underpass, dusk' },
  { name: 'T. Böhmer',  district: 'Detmerode',  note: 'Bus stop 47, facing east' },
  { name: '— —',        district: 'Rabenberg',  note: 'Three cameras, 09:10–09:44' },
]
const BG = ['#b8aca4','#a4b0b8','#a8b4a8','#b4a8b4']

export default function PolaroidOverlay({ onClose }) {
  const [idx, setIdx] = useState(0)
  const [key, setKey] = useState(0)
  const s = STRANGERS[idx]

  function next() {
    setIdx(i => (i + 1) % STRANGERS.length)
    setKey(k => k + 1)
  }

  return (
    <Panel onClose={onClose}>
      <OvHeader>The Stranger's Frame</OvHeader>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div key={key} style={{
          background: '#fff', padding: '10px 10px 38px', maxWidth: 260,
          boxShadow: '0 8px 28px rgba(0,0,0,.16)',
          animation: 'polIn .65s ease forwards',
        }}>
          <style>{`@keyframes polIn{from{opacity:0;transform:rotate(-7deg)scale(.86)}to{opacity:1;transform:rotate(-2deg)scale(1)}}`}</style>
          <div style={{ width: 240, height: 190, background: BG[idx], position: 'relative', overflow: 'hidden' }}>
            <svg width="240" height="190" viewBox="0 0 240 190">
              <filter id="gf"><feColorMatrix type="saturate" values="0" /></filter>
              <rect width="240" height="190" fill={BG[idx]} filter="url(#gf)" />
              <ellipse cx="120" cy="56" rx="22" ry="24" fill="#18181e" />
              <path d="M92,79 Q85,135 76,184 L164,184 Q155,135 148,79 Z" fill="#18181e" />
            </svg>
            <div style={{ position: 'absolute', bottom: 6, left: 8, fontSize: 8, color: 'rgba(255,255,255,.6)', fontFamily: 'monospace' }}>
              {s.note}
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#555', textAlign: 'center', marginTop: 6, fontStyle: 'italic' }}>
            {s.name} — {s.district}
          </div>
        </div>
        <Btn onClick={next}>Next Stranger →</Btn>
      </div>
    </Panel>
  )
}
