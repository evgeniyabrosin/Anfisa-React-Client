import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import cn, { Argument } from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { DsDistItem } from '@declarations'
import { formatDate } from '@core/format-date'
import { useParams } from '@core/hooks/use-params'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { DatasetType } from './dataset-type'

interface Props {
  item: DsDistItem
  isSubItems?: boolean
}

interface DsNameProps {
  dsName: any
  kind: string | null
  isActive: boolean
  isActiveParent: boolean
  isChildrenVisible?: boolean
  isChild?: boolean
  className?: Argument
}

const DatasetName = ({
  dsName,
  kind,
  isActive,
  isActiveParent,
  isChildrenVisible,
  isChild = false,
  className,
}: DsNameProps): ReactElement => {
  return (
    <div
      className={cn(
        kind === null ? 'text-grey-blue' : 'text-white',
        'text-sm leading-18px',
        {
          'font-bold': isActiveParent,
          truncate: !isChildrenVisible,
          'py-2': !kind,
        },
        isChild ? 'absolute top-0 left-0' : 'relative ml-2 pr-7',
        className,
      )}
    >
      {dsName}
      {!isChild && isChildrenVisible && (
        <DatasetName
          dsName={dsName}
          kind={kind}
          isActive={isActive}
          isActiveParent={isActiveParent}
          isChild={true}
        />
      )}
    </div>
  )
}

export const DatasetsListItem = observer(
  ({ item, isSubItems }: Props): ReactElement => {
    const history = useHistory()
    const params = useParams()
    const isActive = item.name === dirinfoStore.selectedDirinfoName
    const [isOpenFolder, setIsOpenFolder] = useState(isActive)
    const [isChildrenVisible, setIsChildrenVisible] = useState(false)
    const isNullKind = item.kind === null
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const hasChildren = secondaryKeys.length > 0

    const isActiveParent =
      hasChildren && secondaryKeys.includes(dirinfoStore.selectedDirinfoName)

    useEffect(() => {
      setIsOpenFolder(secondaryKeys.includes(params.get('ds') || ''))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
      if (isNullKind) return

      if (hasChildren) {
        setIsOpenFolder(prev => !prev)
        dirinfoStore.setDsInfo(item as DsDistItem)
      }

      dirinfoStore.setInfoFrameLink('')
      dirinfoStore.setActiveInfoName('')

      history.replace(`${Routes.Root}?ds=${item.name}`)
    }

    return (
      <Fragment>
        <div
          key={item.name}
          onClick={handleClick}
          className={cn(
            'flex items-center relative',
            isNullKind ? 'cursor-not-allowed' : 'cursor-pointer',
            {
              'pl-5': isSubItems,
              'bg-blue-bright bg-opacity-10': isActive,
            },
          )}
          onMouseEnter={() => {
            setIsChildrenVisible(true)
          }}
          onMouseLeave={() => {
            setIsChildrenVisible(false)
          }}
        >
          <DatasetType
            hasChildren={hasChildren}
            isActive={isActive || isActiveParent}
          />

          <DatasetName
            dsName={item.name}
            kind={item.kind}
            isActive={isActive}
            isActiveParent={isActiveParent}
            isChildrenVisible={isChildrenVisible}
          />

          <div className="ml-auto text-10 leading-18px text-grey-blue whitespace-nowrap bg-blue-lighter">
            <div
              className={cn('py-2 pr-4', {
                'bg-blue-bright bg-opacity-10': isActive,
              })}
            >
              {formatDate(item['create-time'])}
            </div>
          </div>
        </div>

        {isOpenFolder && hasChildren && (
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
