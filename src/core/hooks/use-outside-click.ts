import { RefObject, useEffect } from 'react'

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handleOutsideClick: () => void,
): void => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOutsideClick()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, handleOutsideClick])
}
