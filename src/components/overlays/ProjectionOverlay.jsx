import { useRef, useState, useEffect } from 'react'
import { Panel, OvHeader, Btn } from './Overlay'

const COLORS = [
  { val: '#d8f0d0', bg: '#d8f0d0' },
  { val: '#e84855', bg: '#e84855' },
  { val: '#7ecfef', bg: '#7ecfef' },
  { val: '#ffe06a', bg: '#ffe06a' },
  { val: '#ffffff', bg: '#fff', border: '#aaa' },
]

export default function ProjectionOverlay({ onClose }) {
  const canvasRef = useRef(null)
  const painting = useRef(false)
  const penClr = useRef('#d8f0d0')
  const [activeClr, setActiveClr] = useState(0)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#14221a'
    ctx.fillRect(0, 0, 420, 250)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 3
    ctx.strokeStyle = penClr.current
  }, [])

  function getPos(e, c) {
    const r = c.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: (src.clientX - r.left) * 420 / r.width, y: (src.clientY - r.top) * 250 / r.height }
  }

  function startDraw(e) {
    e.preventDefault()
    painting.current = true
    const ctx = canvasRef.current.getContext('2d')
    const p = getPos(e, canvasRef.current)
    ctx.beginPath(); ctx.moveTo(p.x, p.y)
  }
  function draw(e) {
    e.preventDefault()
    if (!painting.current) return
    const ctx = canvasRef.current.getContext('2d')
    const p = getPos(e, canvasRef.current)
    ctx.lineTo(p.x, p.y); ctx.stroke()
  }
  function endDraw() { painting.current = false }

  function setColor(i) {
    setActiveClr(i)
    penClr.current = COLORS[i].val
    canvasRef.current.getContext('2d').strokeStyle = COLORS[i].val
  }

  function clearCanvas() {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = '#14221a'
    ctx.fillRect(0, 0, 420, 250)
  }

  function project() { onClose() }

  return (
    <Panel onClose={onClose}>
      <OvHeader>The Projection Board</OvHeader>
      <canvas
        ref={canvasRef} width={420} height={250}
        style={{ display: 'block', border: '1px solid #1a2e20', cursor: 'crosshair', margin: '0 auto', background: '#14221a' }}
        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {COLORS.map((c, i) => (
          <div key={i} onClick={() => setColor(i)} style={{
            width: 18, height: 18, borderRadius: '50%', cursor: 'pointer',
            background: c.bg,
            border: `2px solid ${activeClr === i ? '#fff' : (c.border || 'transparent')}`,
            boxShadow: activeClr === i ? '0 0 0 1px #888' : 'none',
          }} />
        ))}
        <button onClick={clearCanvas} style={{ background: 'none', border: '1px solid #ddd', padding: '5px 14px', fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer' }}>
          Clear
        </button>
        <Btn onClick={project} style={{ marginLeft: 'auto', fontSize: 8 }}>Project →</Btn>
      </div>
    </Panel>
  )
}
