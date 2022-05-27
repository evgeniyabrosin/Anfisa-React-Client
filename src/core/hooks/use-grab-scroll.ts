import { MouseEvent, RefObject, useRef } from 'react'

interface Position {
  scrollTop: number
  scrollLeft: number
  mouseX: number
  mouseY: number
}

export type ScrollDirection = 'horizontal' | 'vertical' | 'both'

export const useGrabScroll = (
  ref: RefObject<HTMLElement>,
  direction: ScrollDirection = 'both',
): ((e: MouseEvent<HTMLElement>) => void) => {
  const position = useRef<Position>({
    mouseX: 0,
    mouseY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  })

  return (event: MouseEvent<HTMLElement>) => {
    if (!ref.current) return

    const mouseMoveHandler = (event: { clientX: number; clientY: number }) => {
      if (!ref.current) return

      const dx = event.clientX - position.current.mouseX
      const dy = event.clientY - position.current.mouseY

      if (direction !== 'horizontal') {
        ref.current.scrollTop = position.current.scrollTop - dy
      }
      if (direction !== 'vertical') {
        ref.current.scrollLeft = position.current.scrollLeft - dx
      }
    }

    const mouseUpHandler = () => {
      if (ref.current) ref.current.style.cursor = 'grab'

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    position.current = {
      scrollLeft: ref.current.scrollLeft,
      scrollTop: ref.current.scrollTop,
      mouseX: event.clientX,
      mouseY: event.clientY,
    }

    ref.current.style.cursor = 'grabbing'
    ref.current.style.userSelect = 'none'

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }
}
