export class ServiceProviderBase {
  protected convertToURLParams(data: any) {
    const result = new URLSearchParams()

    Object.keys(data).forEach(key => {
      const entry = data[key]

      if (typeof entry === 'object') {
        result.append(key, JSON.stringify(entry))
      } else {
        result.append(key, entry as string)
      }
    })

    return result
  }
}
