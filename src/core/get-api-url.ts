export const getApiUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? url
    : `${process.env.REACT_APP_URL_BACKEND}/${url}`
}
