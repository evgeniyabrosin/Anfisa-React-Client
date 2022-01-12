import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import cn, { Argument } from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import Tooltip from 'rc-tooltip'

import { StatListType } from '@declarations'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'

type Props = StatListType & {
  onChange?: (checked: boolean) => void
  className?: Argument
  group?: string
  isFunc?: boolean
  isNumeric?: boolean
  incomplete?: boolean
}

export const FilterRefinerGroupItem = observer(
  ({
    name,
    onChange,
    className,
    group,
    isFunc,
    isNumeric,
    title,
    tooltip,
    incomplete = false,
    ...rest
  }: Props): ReactElement => {
    const checked = get(
      filterStore,
      `selectedFilters[${group}][${name}]`,
      false,
    )

    const isIndeterminate = filterStore.selectedGroupItem.name === name

    const handleSelect = () => {
      filterStore.setSelectedGroupItem({ name, ...rest })
    }

    const isNotEnum = isFunc || isNumeric
    const disabled = (isNotEnum && !checked) || incomplete

    const status = incomplete ? '...' : ''

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
          disabled={disabled}
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
          className={cn('text-14 ml-2 cursor-pointer', {
            'font-bold': checked,
          })}
        >
          {name || title}
        </p>

        <span className="text-14 text-blue-bright">{`${status}`}</span>

        {tooltip && (
          <Tooltip
            key={group}
            overlay={tooltip}
            placement="left"
            trigger={tooltip ? ['click'] : []}
          >
            <Icon name="Info" className="ml-1 text-grey-blue cursor-pointer" />
          </Tooltip>
        )}
      </div>
    )
  },
)
