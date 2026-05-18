/* Shared overlay wrapper + backdrop */
export function Backdrop({ onClose }) {
  return (
    <div onClick={onClose} style={{
      display: 'block', position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,.52)', zIndex: 100,
    }} />
  )
}

export function Panel({ dark = false, full = false, children, onClose }) {
  const base = {
    display: full ? 'flex' : 'block',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: 200,
    background: dark ? '#07070f' : '#fff',
    color: dark ? '#fff' : '#1a1a1a',
    border: `1px solid ${dark ? '#1a1a1a' : '#ddd'}`,
  }
  const centered = {
    top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 'min(500px,92vw)',
    maxHeight: '86vh',
    overflowY: 'auto',
    padding: 28,
  }
  const fullscreen = { inset: 0, padding: 40 }
  return (
    <div style={{ ...base, ...(full ? fullscreen : centered) }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: 14, right: 16,
        fontSize: 22, cursor: 'pointer', background: 'none',
        border: 'none', color: dark ? '#555' : '#bbb', lineHeight: 1,
      }}>×</button>
      {children}
    </div>
  )
}

export function OvHeader({ children, dark = false }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, color: '#e84855',
      textTransform: 'uppercase', letterSpacing: '.28em',
      marginBottom: 14, paddingBottom: 10,
      borderBottom: `1px solid ${dark ? '#1a1a1a' : '#eee'}`,
    }}>
      {children}
    </div>
  )
}

export function Btn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: '#e84855', color: '#fff', border: 'none',
      padding: '7px 20px', fontSize: 9, fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '.18em', cursor: 'pointer',
      ...style,
    }}>{children}</button>
  )
}

export function GhostBtn({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: 'none', border: '1px solid #444', color: '#888',
      padding: '8px 22px', fontSize: 9, textTransform: 'uppercase',
      letterSpacing: '.15em', cursor: 'pointer',
      ...style,
    }}>{children}</button>
  )
}
