import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'
import Tooltip from 'rc-tooltip'

import { StatListType } from '@declarations'
import filterStore from '@store/filter'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'

type Props = StatListType & {
  className?: Argument
  group?: string
  isFunc?: boolean
  incomplete?: boolean
}

export const FilterRefinerGroupItem = observer(
  ({
    name,
    className,
    group,
    isFunc,
    title,
    tooltip,
    incomplete = false,
    ...rest
  }: Props): ReactElement => {
    const handleSelect = () => {
      filterStore.setSelectedGroupItem({ name, ...rest })
    }

    const status = incomplete ? '...' : ''

    return (
      <div className={cn('flex items-center pt-1 pr-20', className)}>
        {isFunc && <FnLabel subGroup={true} className="-mr-1" />}

        <span
          key={name}
          onClick={handleSelect}
          className={cn('text-16 ml-2 font-bold cursor-pointer')}
        >
          {name || title}
        </span>

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
