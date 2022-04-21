import { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { Button } from '@ui/button'

const createTrigger = (
  container: HTMLElement,
  placement: 'top' | 'right' | 'bottom' | 'left',
): HTMLElement => {
  const trigger = document.createElement('div')
  Object.assign(trigger.style, {
    position: 'absolute',
    zIndex: 10,
    left: placement === 'right' ? '100%' : 0,
    right: placement === 'left' ? '100%' : 0,
    top: placement === 'bottom' ? '100%' : 0,
    bottom: placement === 'top' ? '100%' : 0,
  })
  trigger.style.position = 'absolute'
  trigger.style.zIndex
  container.appendChild(trigger)

  return trigger
}

const createShadow = (
  container: HTMLElement,
  placement: 'top' | 'right' | 'bottom' | 'left',
) => {
  const shadow = document.createElement('div')
  Object.assign(shadow.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 2,
    top: placement === 'bottom' ? undefined : 0,
    right: placement === 'left' ? undefined : 0,
    bottom: placement === 'top' ? undefined : 0,
    left: placement === 'right' ? undefined : 0,
    width: placement === 'left' || placement === 'right' ? '20px' : undefined,
    height: placement === 'top' || placement === 'bottom' ? '20px' : undefined,
    background: 'pink',
  })
  container.appendChild(shadow)

  return shadow
}

const ShadowScrollView = ({
  children,
  ...rootProps
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
  const shadowsRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollable = scrollableRef.current
    const shadows = shadowsRef.current
    if (!scrollable || !shadows) {
      return
    }

    const area = scrollable?.firstElementChild as HTMLDivElement

    if (!area) {
      return
    }

    const topTrigger = createTrigger(area, 'top')
    const rightTrigger = createTrigger(area, 'right')
    const bottomTrigger = createTrigger(area, 'bottom')
    const leftTrigger = createTrigger(area, 'left')

    const topShadow = createShadow(shadows, 'top')
    const rightShadow = createShadow(shadows, 'right')
    const bottomShadow = createShadow(shadows, 'bottom')
    const leftShadow = createShadow(shadows, 'left')

    const resizeObserver = new ResizeObserver(entries => {
      const {
        contentRect: { width, height },
      } = entries[0]
      shadows.style.width = `${width}px`
      shadows.style.height = `${height}px`
    })

    resizeObserver.observe(scrollable)

    const intersectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          switch (entry.target) {
            case topTrigger:
              console.log('top', entry.isIntersecting)
              topShadow.style.display = entry.isIntersecting ? 'none' : 'block'
              break
            case rightTrigger:
              console.log('right', entry.isIntersecting)
              rightShadow.style.display = entry.isIntersecting
                ? 'none'
                : 'block'
              break
            case bottomTrigger:
              console.log('bottom', entry.isIntersecting)
              bottomShadow.style.display = entry.isIntersecting
                ? 'none'
                : 'block'
              break
            case leftTrigger:
              console.log('left', entry.isIntersecting)
              leftShadow.style.display = entry.isIntersecting ? 'none' : 'block'
              break
          }
        }
      },
      {
        root: scrollable,
      },
    )
    intersectionObserver.observe(topTrigger)
    intersectionObserver.observe(rightTrigger)
    intersectionObserver.observe(bottomTrigger)
    intersectionObserver.observe(leftTrigger)

    return () => {
      ;[
        topTrigger,
        rightTrigger,
        bottomTrigger,
        leftTrigger,
        topShadow,
        rightShadow,
        bottomShadow,
        leftShadow,
      ].forEach(target => target.remove())
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      {...rootProps}
      style={{
        ...rootProps.style,
        position: 'relative',
      }}
    >
      <div
        ref={shadowsRef}
        style={{ position: 'absolute', left: 0, top: 0 }}
      ></div>
      <div
        ref={scrollableRef}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const DemoPage = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <ShadowScrollView
        style={{
          width: '800px',
          height: '200px',
          boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          resize: 'both',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {new Array(count).fill(0).map((_, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 auto',
                width: '400px',
                height: '400px',
                background: `#${Math.floor(Math.random() * 16777215).toString(
                  16,
                )}`,
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </ShadowScrollView>
      <div className="flex">
        <Button
          className="m-4"
          text="Add"
          onClick={() => setCount(count + 1)}
        />
        <Button
          className="m-4"
          text="Remove"
          onClick={() => setCount(Math.max(count - 1, 0))}
        />
      </div>
    </div>
  )
}
