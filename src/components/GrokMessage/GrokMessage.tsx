import type { GrokMessage } from '../../types'
import './GrokMessage.css'

interface Props { message: GrokMessage }

export function GrokMessage({ message }: Props) {
  const isUser = message.role === 'user'
  return (
    <div className={`msg msg--${message.role}`}>
      <div className="msg__avatar">{isUser ? 'U' : 'G'}</div>
      <div className="msg__bubble">
        <div className="msg__text">{message.content}</div>
        {message.searchResults?.length ? (
          <div className="msg__sources">
            {message.searchResults.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noreferrer" className="msg__source">{r.title}</a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}