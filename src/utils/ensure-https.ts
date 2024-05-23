export function ensureHttps(url: string): string {
  // Check if the URL starts with "https://" or "http:////"
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    // If not, add "https://"
    url = 'https://' + url
  }

  return url
}
