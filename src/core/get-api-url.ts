import path from 'path'

export const getApiUrl = (url: string): string => {
  return path.join(url)
}
