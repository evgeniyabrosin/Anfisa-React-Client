import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { SortDirection } from '@core/sort-direction.enum'
import dirinfoStore from '@store/dirinfo'
import { Icon } from '@ui/icon'

interface ISortItemProps {
  text: string
  sortType: SortDatasets
}

export const SortItem = observer(
  ({ text, sortType }: ISortItemProps): ReactElement => {
    const sortIconTransform =
      dirinfoStore.sortDirections[sortType] === SortDirection.ASC

    const handleClick = () => {
      if (dirinfoStore.sortType === sortType) {
        dirinfoStore.setSortDirection()
      } else {
        dirinfoStore.setSortType(sortType)
      }
    }

    const textColor =
      sortType === dirinfoStore.sortType ? 'text-blue-bright' : 'text-grey-blue'

    return (
      <div className="flex items-center cursor-pointer" onClick={handleClick}>
        <div
          className={cn(
            'text-sm font-medium leading-tight mr-2 select-none',
            textColor,
          )}
        >
          {text}
        </div>

        <Icon
          name="Sort"
          className={cn(textColor, 'transform', {
            'rotate-180': sortIconTransform,
          })}
        />
      </div>
    )
  },
)
