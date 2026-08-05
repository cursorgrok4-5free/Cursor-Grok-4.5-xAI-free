import React from 'react'
import type { GrokMessage } from './types'

interface Props { message: GrokMessage }

export function GrokBubble({ message }: Props) {
  const isUser = message.role === 'user'
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexDirection: isUser ? 'row-reverse' : 'row' }}>
      <div style={{ width: 30, height: 30, borderRadius: 15, background: isUser ? '#1d9bf0' : '#FF4500', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
        {isUser ? 'U' : 'G'}
      </div>
      <div style={{ maxWidth: '74%' }}>
        <div style={{ padding: '10px 14px', borderRadius: 14, background: isUser ? '#1d9bf0' : '#16181c', color: '#e7e9ea', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {message.content}
        </div>
        {message.searchResults?.length ? (
          <div style={{ marginTop: 6 }}>
            {message.searchResults.slice(0, 3).map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'block', color: '#1d9bf0', fontSize: 12, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.title}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
