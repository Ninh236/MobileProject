export function getUrlQuery(query: string) {
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has(query)) return searchParams.get(query)
  return undefined
}
