export const APP_CONFIG = {
  name: 'Cursor Grok 4.5 xAI Free',
  version: '1.0.0',
  apiEndpoint: '/api/grok',
  defaultModel: 'grok-4.5' as const,
  webSearchDefault: true,
  streamEnabled: true,
}

export const STORAGE_KEYS = {
  sessions: 'grok45_sessions',
  settings: 'grok45_settings',
}