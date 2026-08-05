import { useState, useCallback } from 'react'
import type { GrokMessage } from './types'

export function useGrokChat() {
  const [messages, setMessages] = useState<GrokMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [webSearch, setWebSearch] = useState(true)

  const send = useCallback(async (content: string) => {
    const msg: GrokMessage = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    setMessages(prev => [...prev, msg])
    setLoading(true)
    try {
      const res = await fetch('/api/grok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, msg], webSearch }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        searchResults: data.searchResults,
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, webSearch])

  return { messages, loading, webSearch, setWebSearch, send, clear: () => setMessages([]) }
}
