import { Fragment, ReactElement, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import { DsDistItem } from '@declarations'
import { formatDate } from '@core/format-date'
import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { DatasetType } from './dataset-type'

interface Props {
  item: DsDistItem
  isSubItems?: boolean
}

interface RootProps {
  onClick?: () => void
  isActive?: boolean
  isSubItems?: boolean
}

const Root = styled(Box)<RootProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-wrap: wrap;
  width: 100%;

  ${ifProp(
    'isActive',
    css`
      background-color: #18a0fb;
      opacity: 0.1;
    `,
  )}

  ${ifProp(
    'isSubItems',
    css`
      padding-left: 24px;
    `,
  )}
`

const StyledName = styled(Text)<{ isActive?: boolean }>`
  font-size: 14px;
  line-height: 16px;
  margin-left: 10px;
  padding-right: 28px;

  ${ifProp(
    'isActive',
    css`
      font-weight: bold;
    `,
  )}
`

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
        <Root
          key={item.name}
          onClick={handleClick}
          isActive={isActive && !isXl}
          isSubItems={isSubItems}
          className="text-white text-sm leading-tight py-2"
        >
          <DatasetType kind={item.kind} isActive={isActive || isActiveXl} />
          <StyledName isActive={isActive || isActiveXl}>{item.name}</StyledName>
          <div className="ml-auto pr-2">{formatDate(item['create-time'])}</div>
        </Root>

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
