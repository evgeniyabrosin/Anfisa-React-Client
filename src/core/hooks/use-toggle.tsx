import { useState } from 'react'

export const useToggle = (
  initiallyVisible = false,
): [boolean, () => void, () => void, () => void] => {
  const [isVisible, setIsVisible] = useState(initiallyVisible)

  const show = (): void => setIsVisible(true)
  const hide = (): void => setIsVisible(false)
  const click = (): void => setIsVisible(prev => !prev)

  return [isVisible, show, hide, click]
}
