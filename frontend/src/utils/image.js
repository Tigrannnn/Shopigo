/**
 * Normalize image URL.
 * If the value is already an absolute URL (starts with http), return as is.
 * Otherwise, prefix with API URL.
 */
export function getImageUrl(src) {
  if (!src) return ''
  if (typeof src !== 'string') return ''
  const trimmed = src.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/$/, '') || ''
  const normalized = trimmed.replace(/^\//, '')
  return apiUrl ? `${apiUrl}/${normalized}` : normalized
}
