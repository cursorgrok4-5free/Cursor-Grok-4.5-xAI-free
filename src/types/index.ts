export interface GrokMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  searchResults?: SearchResult[]
  timestamp: Date
}

export interface SearchResult {
  title: string
  url: string
  snippet: string
}

export interface GrokConfig {
  model: 'grok-4.5' | 'grok-4.5-mini'
  webSearch: boolean
  streamResponse: boolean
  temperature: number
}