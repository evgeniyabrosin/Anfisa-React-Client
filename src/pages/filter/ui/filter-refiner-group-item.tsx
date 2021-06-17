import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { StatListType } from '@declarations'
import filterStore from '@store/filter'

type Props = StatListType & {
  onChange?: (checked: boolean) => void
  className?: string
  amount?: number
  group?: string
  isFunc?: boolean
  isNumeric?: boolean
}

export const FilterRefinerGroupItem = observer(
  ({
    name,
    onChange,
    className,
    amount,
    group,
    isFunc,
    isNumeric,
    ...rest
  }: Props): ReactElement => {
    const checked = get(
      filterStore,
      `selectedFilters[${group}][${name}]`,
      false,
    )

    const selectedAmounts: number[] = Object.values(
      get(filterStore, `selectedFilters[${group}][${name}]`, {}),
    )

    const selectedSum = selectedAmounts.reduce((prev, cur) => prev + cur, 0)

    const isIndeterminate = filterStore.selectedGroupItem.name === name

    const handleSelect = () => {
      filterStore.setSelectedGroupItem({ name, ...rest })
    }

    return (
      <div
        className={cn(
          'flex items-center py-1 pr-20',
          {
            'bg-blue-light': isIndeterminate,
          },
          className,
        )}
      >
        <Checkbox
          className="cursor-pointer bg-white w-4 h-4 rounded-sm border-2 border-grey-blue"
          checked={checked}
          indeterminate={isIndeterminate}
          disabled={(isFunc || isNumeric) && !checked}
          onChange={event => onChange && onChange(event.target.checked)}
        />

        {isFunc && (
          <p className="text-10 leading-10px text-green-secondary bg-green-light p-1 w-4 h-4 flex items-center ml-2 rounded-sm">
            fn
          </p>
        )}

        <p
          key={name}
          onClick={handleSelect}
          className={cn('text-14 text-black ml-2 cursor-pointer', {
            'font-bold': checked,
          })}
        >
          {name}
        </p>

        {amount !== 0 && (
          <span className="text-14 text-grey-blue ml-1">
            {'('}
            {selectedSum !== 0 && (
              <span className="text-14 text-blue-bright">{`${selectedSum}/`}</span>
            )}
            {`${amount})`}
          </span>
        )}
      </div>
    )
  },
)
