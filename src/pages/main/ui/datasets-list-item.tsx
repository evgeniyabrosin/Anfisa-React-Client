import { Fragment, ReactElement, useState } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { DsDistItem } from '@declarations'
import { formatDate } from '@core/format-date'
import dirinfoStore from '@store/dirinfo'
import { DatasetType } from './dataset-type'

interface Props {
  item: DsDistItem
  isSubItems?: boolean
}

export const DatasetsListItem = observer(
  ({ item, isSubItems }: Props): ReactElement => {
    const [isOpenFolder, setIsOpenFolder] = useState(false)
    const isXl = item.kind === 'xl'
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const isActive = item.name === dirinfoStore.selectedDirinfoName

    const isActiveXl =
      isXl && secondaryKeys.includes(dirinfoStore.selectedDirinfoName)

    const handleClick = () => {
      if (isXl) {
        setIsOpenFolder(prev => !prev)
        dirinfoStore.setDsInfo(item as DsDistItem)
      }

      dirinfoStore.setInfoFrameLink('')
      dirinfoStore.setSelectedDirinfoName(item.name)
      dirinfoStore.setActiveInfoName('')

      if (!isXl) {
        dirinfoStore.fetchDsinfoAsync(item.name)
      }
    }

    return (
      <Fragment>
        <div
          key={item.name}
          onClick={handleClick}
          className={cn('py-2 flex items-center cursor-pointer', {
            'pl-5': isSubItems,
            'bg-blue-bright bg-opacity-10': isActive && !isXl,
          })}
        >
          <DatasetType kind={item.kind} isActive={isActive || isActiveXl} />

          <div
            className={cn('text-white text-sm leading-18px ml-2 pr-7', {
              'font-bold': isActive || isActiveXl,
            })}
          >
            {item.name}
          </div>

          <div className="ml-auto pr-2 text-10 leading-18px text-grey-blue">
            {formatDate(item['create-time'])}
          </div>
        </div>

        {isOpenFolder && isXl && (
          <div>
            {secondaryKeys.map((secondaryKey: string) => {
              const secondaryItem: DsDistItem =
                dirinfoStore.dirinfo['ds-dict'][secondaryKey]

              return (
                <DatasetsListItem
                  item={secondaryItem}
                  key={secondaryItem.name}
                  isSubItems
                />
              )
            })}
          </div>
        )}
      </Fragment>
    )
  },
)
