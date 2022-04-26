import { RefObject, useEffect, useState } from 'react'

import useWindowDimensions from './use-window-dimensions'

export default function useClientHeight(ref: RefObject<HTMLElement>) {
  const { height } = useWindowDimensions()
  const [offsetTop, setOffsetTop] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      setOffsetTop(ref.current?.offsetTop)
    }
  }, [ref])

  return height - offsetTop
}