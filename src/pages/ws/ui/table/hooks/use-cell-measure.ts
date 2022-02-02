import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import ResizeObserver from 'resize-observer-polyfill'
import shortId from 'shortid'

/**
 * This custom hook is designed to replace the `<CellMeasurer />` component in `react-virtualized`
 * in `react-window`.
 *
 * This hook returns props to be given to the `<VariableSizeList />` component in `react-window`.
 *
 * `items` are react elements.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function useCellMeasurer({ items }) {
  // create a ref to get the `div` element the `VariableSizeList` uses
  const innerRef = useRef(null)

  // create an unique to this cell measurer instance
  const id = useMemo(shortId, [])

  // create a "hidden sizing element" in state.
  //
  // when the innerRef element mounts, the width of the innerRef will be used for width of
  // the hidden sizing element
  const [hiddenSizingEl, setHiddenSizingEl] = useState(null)

  // this width is used to determine whether or not the list needs to be re-rendered due to a resize
  const [width, setWidth] = useState(0)

  // `itemSize` is a function required by `VariableSizeList`. This function is called when it needs
  // get the height of the item inside it.
  // note: the result of this function is memoized by `react-window` so it will only be called once
  // to get the item size
  const itemSize = useCallback(
    index => {
      if (!hiddenSizingEl) return 0

      // get the item (which is a react node)
      const item = items[index]

      // then render the react node to a string sychronusly with `react-dom/server`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hiddenSizingEl.innerHTML = renderToString(item)

      // get and return the size of the hidden sizing element
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return hiddenSizingEl.clientHeight || 0
    },
    [hiddenSizingEl, items],
  )

  // this effects adds the hidden sizing element to the DOM
  useEffect(() => {
    const innerEl = innerRef.current

    if (!innerEl) return

    if (hiddenSizingEl) return

    const newHiddenSizingEl = document.createElement('div')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const clientWidth = innerEl.clientWidth

    newHiddenSizingEl.classList.add(`hidden-sizing-element-${id}`)
    newHiddenSizingEl.style.position = 'absolute'
    newHiddenSizingEl.style.top = '0'
    newHiddenSizingEl.style.width = `${clientWidth}px`
    newHiddenSizingEl.style.pointerEvents = 'none'
    newHiddenSizingEl.style.visibility = 'hidden'

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setHiddenSizingEl(newHiddenSizingEl)

    document.body.append(newHiddenSizingEl)
  }, [hiddenSizingEl, id])

  // this removes all hidden sizing elemnts on unmount
  useEffect(() => {
    // returning a function from `useEffect` is the "clean-up" phase
    return () => {
      const hiddenSizingElement = document.querySelector(
        `.hidden-sizing-element-${id}`,
      )

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hiddenSizingElement.remove()
    }
  }, [id])

  // this is used to watch for changes in the size of the list element and sets the width
  useEffect(() => {
    const el = innerRef.current

    if (!el) return

    function handleResize() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { wd } = el.getBoundingClientRect()

      setWidth(wd)
    }

    const resizeObserver = new ResizeObserver(handleResize)

    resizeObserver.observe(el)

    return () => resizeObserver.disconnect()
  }, [])

  // this key is used to re-render the list when the dependncies array changes
  const key = useMemo(shortId, [itemSize, hiddenSizingEl, width])

  // while there is no hidden sizing element, hide the list element
  const style = hiddenSizingEl
    ? undefined
    : {
        visibility: 'hidden',
      }

  return {
    innerRef,
    itemSize,
    itemCount: items.length,
    key,
    style,
  }
}
