export const getApiUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? `/app/${url}`
    : `${process.env.REACT_APP_URL_BACKEND}/${url}`
}

export const getIgvUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? `/igv-resource/${url}`
    : `${process.env.IGV_SERVICE_URL}/${url}`
}
