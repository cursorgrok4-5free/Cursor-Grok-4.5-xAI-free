import { useState, useRef, useEffect } from 'react'
import { useGrokChat } from './hooks/useGrokChat'
import { GrokMessage } from './components/GrokMessage/GrokMessage'
import { ChatInput } from './components/ChatInput/ChatInput'
import type { GrokMessage as GrokMessageType } from './types'
import './styles/global.css'

export default function App() {
  const { messages, loading, send, clear } = useGrokChat()
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const submit = () => {
    if (!input.trim() || loading) return
    send(input.trim())
    setInput('')
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Cursor Grok 4.5 — xAI Free</h1>
      </header>

      <main className="app__messages">
        {messages.length === 0 && <p className="app__empty">Ask Grok 4.5 anything — coding, research, real-time web.</p>}
        {messages.map(m => <GrokMessage key={m.id} message={m} />)}
        {loading && <p className="app__typing">Grok 4.5 is thinking…</p>}
        <div ref={endRef} />
      </main>

      <footer className="app__input">
        <ChatInput value={input} onChange={setInput} onSubmit={submit} disabled={loading} />
        {messages.length > 0 && <button onClick={clear} className="btn btn--ghost">Clear</button>}
      </footer>
    </div>
  )
}