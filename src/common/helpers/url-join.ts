export default function urlJoin(...args: string[]): string {
  return args
    .map((uri) => {
      if (uri.startsWith('http://')) return uri
      if (uri.startsWith('https://')) return uri
      if (uri.startsWith('/')) uri = uri.slice(1)
      if (uri.endsWith('/')) uri = uri.slice(0, -1)
      return uri
    })
    .filter(Boolean)
    .join('/')
}
