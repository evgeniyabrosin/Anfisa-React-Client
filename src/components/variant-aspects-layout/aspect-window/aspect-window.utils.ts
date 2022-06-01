import { RefObject, useState } from 'react'

export const useScrollShadow = (
  ref: RefObject<HTMLElement>,
): {
  shouldAddShadow: boolean
  handleScroll: () => void
} => {
  const [shouldAddShadow, setShouldAddShadow] = useState(false)

  const handleScroll = () => {
    if (ref.current) {
      const needShadow = ref.current.scrollLeft > 5

      if (needShadow !== shouldAddShadow) {
        setShouldAddShadow(needShadow)
      }
    }
  }

  return { shouldAddShadow, handleScroll }
}
