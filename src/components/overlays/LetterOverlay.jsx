import { useState } from 'react'
import { Panel, OvHeader, Btn } from './Overlay'

const initMsgs = [
  { from: 'Anonymous · Porschestraße', text: 'Dear stranger, I sat here for an hour watching people walk past without looking up. I left a flower on the bench. Did you find it?' }
]

export default function LetterOverlay({ onClose }) {
  const [msgs, setMsgs] = useState(initMsgs)
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
    setMsgs(m => [...m, { from: 'Visitor · ' + new Date().toLocaleTimeString(), text: input.trim() }])
    setInput('')
  }

  return (
    <Panel onClose={onClose}>
      <OvHeader>The Open Letter</OvHeader>
      <div style={{
        background: '#f8f8f6', border: '1px solid #eee',
        padding: 14, maxHeight: 200, overflowY: 'auto',
        fontSize: 12, lineHeight: 1.65, marginBottom: 14,
      }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < msgs.length-1 ? '1px solid #eee' : 'none' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#e84855', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 3 }}>{m.from}</div>
            {m.text}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Leave your message for the next stranger…"
        style={{ width: '100%', minHeight: 72, border: '1px solid #ddd', padding: 9, font: '12px/1.5 inherit', resize: 'vertical', outline: 'none', marginBottom: 8 }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Btn onClick={send}>Post</Btn>
      </div>
    </Panel>
  )
}
