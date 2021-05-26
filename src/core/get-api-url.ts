export const getApiUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? `${process.env.REACT_APP_LOCAL_PROXY_KEY}/${url}`
    : `${process.env.REACT_APP_URL_BACKEND}/${url}`
}
