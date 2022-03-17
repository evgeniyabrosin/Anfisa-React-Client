import { useState } from 'react'

export const useToggle = (
  initiallyVisible = false,
): [boolean, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState(initiallyVisible)

  const show = (): void => setIsVisible(true)
  const hide = (): void => setIsVisible(false)

  return [isVisible, show, hide]
}
