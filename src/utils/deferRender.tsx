import { ReactChild, ReactElement, ReactNode, useEffect, useState } from 'react'
// eslint-disable-next-line no-duplicate-imports
import React from 'react'
import { observer } from 'mobx-react-lite'

interface DeferProps {
  chunkSize: number
  children: ReactNode | ReactChild
  renderId: (id: number) => void
}

export const DeferRender = observer(
  ({ chunkSize, renderId, children }: DeferProps): ReactElement => {
    const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize)
    const childrenArray = React.Children.toArray(children)

    useEffect(() => {
      if (renderedItemsCount < childrenArray.length) {
        const requestId = window.requestIdleCallback(
          () => {
            setRenderedItemsCount(Math.min(renderedItemsCount + chunkSize, childrenArray.length))
            renderId(requestId)
          },
          { timeout: 200 },
        )
      }
    }, [renderedItemsCount, setRenderedItemsCount, childrenArray.length, chunkSize, renderId])

    const sliced = childrenArray.slice(0, renderedItemsCount)

    return <React.Fragment>{sliced}</React.Fragment>
  },
)
