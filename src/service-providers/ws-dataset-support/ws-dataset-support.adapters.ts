import { IWsList } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'

export const adaptWsListResponse = (response: IWsList): IWsList => {
  const camelizedData = {}

  for (const key in response) {
    const camelizedKey = key.replace(/-./g, x => x[1].toUpperCase())

    Object.defineProperty(camelizedData, camelizedKey, {
      value: response[key as keyof IWsList],
    })
  }

  return camelizedData as IWsList
}
