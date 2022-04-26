export const getApiUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? `/app/${url}`
    : `${window._env_.REACT_APP_URL_BACKEND}/${url}`
}
