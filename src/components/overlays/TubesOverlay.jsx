import { useState, useRef } from 'react'
import { Panel, OvHeader, GhostBtn } from './Overlay'

export default function TubesOverlay({ onClose }) {
  const [playing, setPlaying] = useState(false)
  const [recording, setRecording] = useState(false)
  const [status, setStatus] = useState(null)
  const recRef = useRef(null)
  const chunksRef = useRef([])

  function playMsg() {
    setPlaying(true)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'; o.frequency.value = 320
      g.gain.setValueAtTime(.22, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + 2.6)
      o.start(); o.stop(ctx.currentTime + 2.6)
    } catch(e) {}
    setStatus({ type: 'quote', text: '"You don\'t know me, but I walk past your window every morning."' })
    setTimeout(() => { setPlaying(false); setStatus(null) }, 3200)
  }

  async function toggleRec() {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        recRef.current = new MediaRecorder(stream)
        chunksRef.current = []
        recRef.current.ondataavailable = e => chunksRef.current.push(e.data)
        recRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const url = URL.createObjectURL(blob)
          const aud = new Audio(url)
          setStatus({ type: 'play', audio: aud })
        }
        recRef.current.start()
        setRecording(true)
        setStatus({ type: 'recording' })
      } catch(e) {
        setStatus({ type: 'error' })
      }
    } else {
      recRef.current?.stop()
      recRef.current?.stream.getTracks().forEach(t => t.stop())
      setRecording(false)
    }
  }

  return (
    <Panel dark onClose={onClose}>
      <OvHeader dark>Speaking Tubes</OvHeader>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ fontSize: 8, color: '#333', letterSpacing: '.2em', textTransform: 'uppercase' }}>
          A Message from Stadtmitte
        </div>
        <GhostBtn onClick={playMsg} disabled={playing}>
          {playing ? '▶  Playing…' : '▶  Play Message'}
        </GhostBtn>
        <div style={{ fontSize: 8, color: '#333', letterSpacing: '.12em' }}>— or record your own —</div>
        <button onClick={toggleRec} style={{
          width: 78, height: 78, borderRadius: '50%',
          border: '3px solid #e84855',
          background: recording ? '#e84855' : 'transparent',
          color: recording ? '#fff' : '#e84855',
          fontSize: 9, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '.12em', cursor: 'pointer',
          animation: recording ? 'pls 1s infinite' : 'none',
        }}>
          <style>{`@keyframes pls{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}`}</style>
          {recording ? 'STOP' : 'REC'}
        </button>
        {status?.type === 'quote' && (
          <div style={{ fontSize: 10, color: '#555', fontStyle: 'italic', textAlign: 'center', maxWidth: 280 }}>
            {status.text}
          </div>
        )}
        {status?.type === 'recording' && (
          <div style={{ fontSize: 10, color: '#e84855', letterSpacing: '.08em' }}>Recording…</div>
        )}
        {status?.type === 'play' && (
          <GhostBtn onClick={() => status.audio.play()}>▶ Play Back</GhostBtn>
        )}
        {status?.type === 'error' && (
          <div style={{ fontSize: 10, color: '#666' }}>Microphone access denied.</div>
        )}
      </div>
    </Panel>
  )
}
