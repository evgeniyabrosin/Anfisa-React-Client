import { SessionStoreManager } from '@core/storage-management/session-store-manager'

export type TScrollPositionParams = {
  elem: string | HTMLElement
  storageId: string
}

export type TReadScrollPosition = () => void
export type TWriteScrollPosition = () => void

export const useScrollPosition = ({
  elem,
  storageId,
}: TScrollPositionParams): [TReadScrollPosition, TWriteScrollPosition] => {
  const readScrollPosition: TReadScrollPosition = (): void => {
    const scrollOptions =
      SessionStoreManager.read<ScrollToOptions>(storageId) || {}

    const HTMLElement =
      typeof elem === 'string' ? document.querySelectorAll(elem)[0] : elem

    HTMLElement?.scrollTo(scrollOptions)
  }

  const writeScrollPosition: TWriteScrollPosition = (): void => {
    if (typeof elem === 'string') {
      const [HTMLElement] = document.querySelectorAll(elem)

      SessionStoreManager.write(storageId, {
        top: HTMLElement?.scrollTop,
        left: HTMLElement?.scrollLeft,
      })
    } else if (typeof elem === 'object') {
      SessionStoreManager.write(storageId, {
        top: elem?.scrollTop,
        left: elem?.scrollLeft,
      })
    }
  }

  return [readScrollPosition, writeScrollPosition]
}
