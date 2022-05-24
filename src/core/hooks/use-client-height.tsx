import { RefObject, useEffect, useState } from 'react'

import useWindowDimensions from './use-window-dimensions'

export default function useClientHeight(ref: RefObject<HTMLElement>) {
  const { height } = useWindowDimensions()
  const [offsetTop, setOffsetTop] = useState<number>(0)

  useEffect(() => {
    if (ref.current) {
      setOffsetTop(ref.current?.offsetTop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return height - offsetTop
}
