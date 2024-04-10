import join from '@common/core/path/join'
import { getUrlQuery } from './url-query'

export const getPrefix = (prefix: string) => {
  const urlQuery = getUrlQuery('query')
  if (urlQuery) return join(prefix, urlQuery)
  return prefix
}
