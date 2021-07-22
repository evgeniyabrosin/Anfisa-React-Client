import { Fragment, ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import { Icon } from '@ui/icon'

interface Props {
  title: string
  filters: Record<string, number>
  onRemove: (name: string) => void
}

export const SelectedFilterCard = observer(
  ({ title, filters, onRemove }: Props): ReactElement => {
    const [isOpen, open, close] = useToggle(true)
    const filterKeys = Object.keys(filters)

    if (filterKeys.length === 0) {
      return <Fragment />
    }

    return (
      <div>
        <div
          className="flex items-center border-b border-grey-light p-4 cursor-pointer"
          onClick={isOpen ? close : open}
        >
          <span className="leading-16px">{title}</span>

          <Icon
            name="Arrow"
            className={cn(
              'text-blue-bright ml-auto transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        </div>

        {isOpen && (
          <div>
            {filterKeys.map(filterKey => (
              <div key={filterKey} className="flex items-center pl-6 py-4">
                <Checkbox checked onChange={() => onRemove(filterKey)} />
                <span className="text-14 leading-16px font-bold ml-2">
                  {filterKey}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
)
