import { Fragment, useEffect } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'

type Props = {
  data?: string[]
}

export const FilterTags = observer(({ data }: Props) => {
  const [isVisibleCounter, showCounter, hideCounter] = useToggle(false)

  useEffect(() => {
    data && data.length >= 3 ? showCounter() : hideCounter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length])

  return (
    <Fragment>
      <div
        className="flex flex-wrap items-center"
        style={{ width: 'auto', maxWidth: '100%' }}
      >
        {data?.map((item: string, index: number) => {
          return (
            index <= 1 && (
              <div key={Math.random()}>
                <div
                  style={{ width: 'auto', maxWidth: '100%' }}
                  className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg"
                >
                  <div>
                    {item.length > 15 ? item.slice(0, 15) + '...' : item}
                  </div>

                  <Icon name="Close" size={8} className="ml-1" />
                </div>
              </div>
            )
          )
        })}

        <div>
          <div
            style={{ display: isVisibleCounter ? 'flex' : 'none' }}
            className={cn(
              ' w-8.5 inline-flex flex-nowrap items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg',
            )}
          >
            + {data && data.length - 2}
          </div>
        </div>
      </div>
    </Fragment>
  )
})
