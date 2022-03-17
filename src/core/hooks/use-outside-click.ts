import { RefObject, useEffect, useRef } from 'react'

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handleOutsideClick: () => void,
): void => {
  const handlerRef = useRef(handleOutsideClick)
  handlerRef.current = handleOutsideClick

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerRef.current()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref])
}
