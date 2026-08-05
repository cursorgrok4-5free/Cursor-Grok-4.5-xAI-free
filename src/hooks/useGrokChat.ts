import { useState } from 'react'
import type { GrokMessage } from '../../types'

export function useGrokChat() {
  const [messages, setMessages] = useState<GrokMessage[]>([])
  const [loading, setLoading] = useState(false)

  const send = async (content: string) => {
    const msg: GrokMessage = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    setMessages(prev => [...prev, msg])
    setLoading(true)
    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, msg] }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.content,
        searchResults: data.searchResults,
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, send, clear: () => setMessages([]) }
}