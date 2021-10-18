import { ReactElement, useEffect, useMemo, useState } from 'react'
import React from 'react'
import { observer } from 'mobx-react-lite'

interface DeferProps {
  chunkSize: number
  children: React.ReactNode | React.ReactChild
}

export const DeferRender = observer(
  ({ chunkSize, children }: DeferProps): ReactElement => {
    const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize)

    const childrenArray = useMemo(() => React.Children.toArray(children), [
      children,
    ])

    useEffect(() => {
      if (renderedItemsCount < childrenArray.length) {
        window.requestIdleCallback(
          () => {
            setRenderedItemsCount(
              Math.min(renderedItemsCount + chunkSize, childrenArray.length),
            )
          },
          { timeout: 200 },
        )
      }
    }, [
      renderedItemsCount,
      setRenderedItemsCount,
      childrenArray.length,
      chunkSize,
    ])

    const sliced = childrenArray.slice(0, renderedItemsCount)

    return <React.Fragment>{sliced}</React.Fragment>
  },
)
