import { useEffect } from 'react'

export const useKeydown = (
  pairs: {
    eventCode: string
    callback: () => void
  }[],
): void => {
  useEffect(() => {
    const handleKeydown = (event: any) => {
      pairs.forEach(pair => {
        if (pair.eventCode === event.code) pair.callback()
      })
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
