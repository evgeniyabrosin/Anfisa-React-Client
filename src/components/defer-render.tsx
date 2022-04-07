import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react'

interface IDeferRenderProps {
  chunkSize: number
  children: ReactNode
}

const hasRequestIdleCallback = !!window.requestIdleCallback

const requestRenderCallback = hasRequestIdleCallback
  ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 200 })
  : (cb: () => void) => window.setTimeout(cb, 1)

const cancelRenderCallback = hasRequestIdleCallback
  ? window.cancelIdleCallback
  : window.clearTimeout

export const DeferRender = ({
  chunkSize,
  children,
}: IDeferRenderProps): ReactElement => {
  const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize)
  const totalCount = React.Children.count(children)

  useEffect(() => {
    if (renderedItemsCount < totalCount) {
      const requestId = requestRenderCallback(() => {
        setRenderedItemsCount(
          Math.min(renderedItemsCount + chunkSize, totalCount),
        )
      })

      return () => {
        cancelRenderCallback(requestId)
      }
    }
  }, [renderedItemsCount, setRenderedItemsCount, totalCount, chunkSize])

  return (
    <Fragment>
      {React.Children.map(children, (child, index) =>
        index < renderedItemsCount ? child : null,
      )}
    </Fragment>
  )
}
