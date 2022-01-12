/* eslint-disable unicorn/no-useless-undefined */
export class StoreManager {
  protected static storage: Storage

  public static read<T = any>(key: string, prefix?: string) {
    if (prefix) {
      const value = this.storage.getItem(prefix)

      if (!value) return undefined

      return (JSON.parse(value) || {})[key] as T
    } else {
      const value = this.storage.getItem(key)

      if (!value) return undefined

      return JSON.parse(value) as T
    }
  }

  public static write(key: string, data: any, prefix?: string) {
    if (prefix) {
      const savedData = this.read(prefix)

      if (savedData) {
        savedData[key] = data

        return this.storage.setItem(prefix, JSON.stringify(savedData))
      } else {
        return this.storage.setItem(prefix, JSON.stringify({ [key]: data }))
      }
    }

    return this.storage.setItem(key, JSON.stringify(data))
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

    return this.storage.removeItem(key)
  }
}
