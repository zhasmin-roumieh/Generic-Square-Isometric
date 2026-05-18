import { useState } from 'react'
import Tooltip from './components/Tooltip'
import MemorySquare from './components/squares/MemorySquare'
import ConnectionSquare from './components/squares/ConnectionSquare'
import SpeculationSquare from './components/squares/SpeculationSquare'
import { Backdrop } from './components/overlays/Overlay'
import LetterOverlay from './components/overlays/LetterOverlay'
import PolaroidOverlay from './components/overlays/PolaroidOverlay'
import SpyglassOverlay from './components/overlays/SpyglassOverlay'
import TubesOverlay from './components/overlays/TubesOverlay'
import ProjectionOverlay from './components/overlays/ProjectionOverlay'
import ArchiveOverlay from './components/overlays/ArchiveOverlay'

const SQUARES = [
  {
    id: 'memory',
    label: 'Memory Square',
    tags: ['Trace', 'Memory', 'Encounter'],
    Component: MemorySquare,
  },
  {
    id: 'connection',
    label: 'Connection Square',
    tags: ['Cross-Neighbourhood', 'Proximity', 'Touch'],
    Component: ConnectionSquare,
  },
  {
    id: 'speculation',
    label: 'Speculation Square',
    tags: ['Vision', 'Speculation', 'Future'],
    Component: SpeculationSquare,
  },
]

const OVERLAY_MAP = {
  letter:     LetterOverlay,
  polaroid:   PolaroidOverlay,
  spyglass:   SpyglassOverlay,
  tubes:      TubesOverlay,
  projection: ProjectionOverlay,
  archive:    ArchiveOverlay,
}

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState(null)

  function openOverlay(key) { setActiveOverlay(key) }
  function closeOverlay()  { setActiveOverlay(null) }

  const ActiveOverlay = activeOverlay ? OVERLAY_MAP[activeOverlay] : null

  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f2', fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif" }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 40px 18px',
        borderBottom: '1px solid #e0e0dc',
        background: '#fff',
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.4em', textTransform: 'uppercase', color: '#e84855' }}>
            Urban Portals
          </div>
          <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#bbb', marginTop: 3 }}>
            Wolfsburg — Interactive Exhibition
          </div>
        </div>
        <div style={{ fontSize: 9, color: '#ccc', letterSpacing: '.12em', textTransform: 'uppercase' }}>2026</div>
      </header>

      {/* Three squares */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        background: '#fff',
      }}>
        {SQUARES.map(({ id, label, tags, Component }) => (
          <div key={id} style={{
            display: 'flex', flexDirection: 'column',
            padding: '28px 24px 32px',
            borderRight: '1px solid #e8e8e4',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#e84855', textTransform: 'uppercase', letterSpacing: '.3em', marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {tags.map(t => (
                <span key={t} style={{ fontSize: 8, color: '#bbb', letterSpacing: '.15em', textTransform: 'uppercase', padding: '2px 6px', border: '1px solid #e8e8e4' }}>
                  {t}
                </span>
              ))}
            </div>
            <Component onOpen={openOverlay} />
          </div>
        ))}
      </main>

      {/* Overlays */}
      {ActiveOverlay && (
        <>
          <Backdrop onClose={closeOverlay} />
          <ActiveOverlay onClose={closeOverlay} />
        </>
      )}

      {/* Global tooltip */}
      <Tooltip />

      {/* Plumb-bob hover CSS */}
      <style>{`
        .clickable .plumb { opacity: 0; transition: opacity .2s; pointer-events: none; }
        .clickable:hover .plumb { opacity: 1; }
        .clickable { cursor: pointer; transition: filter .15s; }
        .clickable:hover { filter: brightness(1.08) drop-shadow(0 0 3px rgba(232,72,85,.25)); }
      `}</style>
    </div>
  )
}
