import axios, { AxiosRequestHeaders } from 'axios'

export class ServiceProviderBase {
  private axios = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? '/app/'
        : `${process.env.REACT_APP_URL_BACKEND}/`,
    transformRequest: (data: unknown, headers?: AxiosRequestHeaders) => {
      if (
        headers?.['Content-Type'] === 'application/x-www-form-urlencoded' &&
        typeof data === 'object' &&
        !(data instanceof URLSearchParams)
      ) {
        return this.convertToURLParams(data)
      }

      return data
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  protected get = this.axios.get
  protected post = this.axios.post
  protected put = this.axios.put
  protected patch = this.axios.patch
  protected delete = this.axios.delete

  protected convertToURLParams(data: any) {
    const result = new URLSearchParams()

    Object.keys(data).forEach(key => {
      const entry = data[key]

      if (entry != null) {
        if (typeof entry === 'object') {
          result.append(key, JSON.stringify(entry))
        } else {
          result.append(key, entry as string)
        }
      }
    })

    return result
  }
}
