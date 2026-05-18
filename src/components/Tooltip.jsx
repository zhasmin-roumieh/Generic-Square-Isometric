import { useState, useEffect } from 'react'

export default function Tooltip() {
  const [state, setState] = useState({ text: '', x: 0, y: 0, visible: false })

  useEffect(() => {
    function onEnter(e) {
      const tip = e.target.closest('[data-tip]')
      if (tip) setState(s => ({ ...s, text: tip.dataset.tip, visible: true }))
    }
    function onMove(e) {
      setState(s => ({ ...s, x: e.clientX + 14, y: e.clientY - 28 }))
    }
    function onLeave(e) {
      if (!e.target.closest('[data-tip]')) return
      setState(s => ({ ...s, visible: false }))
    }
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseout', onLeave)
    return () => {
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  if (!state.visible) return null
  return (
    <div style={{
      position: 'fixed',
      left: state.x,
      top: state.y,
      background: '#1a1a1a',
      color: '#fff',
      fontSize: 9,
      padding: '4px 9px',
      textTransform: 'uppercase',
      letterSpacing: '.12em',
      pointerEvents: 'none',
      zIndex: 9999,
      whiteSpace: 'nowrap',
    }}>
      {state.text}
    </div>
  )
}
