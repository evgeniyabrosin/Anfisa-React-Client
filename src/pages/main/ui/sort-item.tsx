import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { SortDirection } from '@core/sort-direction.enum'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { SortSvg } from '@icons/sort'

interface Props {
  text: string
  sortType: SortDatasets
}

export const SortItem = observer(
  ({ text, sortType }: Props): ReactElement => {
    const activeSortColor = theme('colors.blue.bright')

    const sortIconTransform =
      dirinfoStore.sortDirections[sortType] === SortDirection.ASC
        ? 'none'
        : 'rotate(180deg) scaleX(-1)'

    const handleClick = () => {
      if (dirinfoStore.sortType === sortType) {
        dirinfoStore.setSortDirection()
      } else {
        dirinfoStore.setSortType(sortType)
      }
    }

    return (
      <div className="flex items-center cursor-pointer" onClick={handleClick}>
        <div
          className="text-sm text-grey-blue leading-tight mr-2"
          style={{
            color:
              sortType === dirinfoStore.sortType
                ? activeSortColor
                : theme('colors.grey.blue'),
          }}
        >
          {text}
        </div>

        <SortSvg
          style={{ transform: sortIconTransform }}
          fill={
            sortType === dirinfoStore.sortType
              ? activeSortColor
              : theme('colors.grey.blue')
          }
        />
      </div>
    )
  },
)
