export const getApiUrl = (url: string): string => {
  return process.env.NODE_ENV === 'development'
    ? `/app/${url}`
    : `${process.env.REACT_APP_URL_BACKEND}/${url}`
}

export const getIgvUrl = (url = ''): string => {
  return process.env.NODE_ENV === 'development'
    ? `/igv-resource/${url}`
    : `${process.env.REACT_APP_IGV_SERVICE_URL}/${url}`
}
