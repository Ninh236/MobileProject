export default function join(...args: string[]) {
  // remove trailing
  const remapPaths = args.map((pathLike, index) => {
    if (pathLike === '') return null
    if (pathLike.startsWith('/')) return pathLike.substring(1)
    if (pathLike.endsWith('/') && index !== args.length - 1)
      return pathLike.substring(0, pathLike.length - 1)
    return pathLike
  })

  return remapPaths
    .filter((pathLike) => pathLike)
    .join('/')
    .replace(/\/\//gm, '/')
}
