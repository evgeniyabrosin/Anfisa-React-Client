/* eslint-disable unicorn/no-useless-undefined */
export class SessionStoreManager {
  public static read<T = any>(key: string, prefix?: string) {
    if (prefix) {
      const value = sessionStorage.getItem(prefix)

      if (!value) return undefined

      return (JSON.parse(value) || {})[key] as T
    } else {
      const value = sessionStorage.getItem(key)

      if (!value) return undefined

      return JSON.parse(value) as T
    }
  }

  public static write(key: string, data: any, prefix?: string) {
    if (prefix) {
      const savedData = this.read(prefix)

      if (savedData) {
        savedData[key] = data

        return sessionStorage.setItem(prefix, JSON.stringify(savedData))
      } else {
        return sessionStorage.setItem(prefix, JSON.stringify({ [key]: data }))
      }
    }

    return sessionStorage.setItem(key, JSON.stringify(data))
  }

  public static delete(key: string, prefix?: string) {
    if (prefix) {
      const savedData = this.read(prefix)

      if (savedData) {
        delete savedData[key]

        return this.write(prefix, savedData)
      } else {
        return undefined
      }
    }

    return sessionStorage.removeItem(key)
  }
}
