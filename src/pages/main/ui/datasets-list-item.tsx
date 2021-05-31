import { Fragment, ReactElement, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import { DsDistItem } from '@declarations'
import { formatDate } from '@core/format-date'
import { theme } from '@theme'
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
  margin-top: 8px;
  margin-bottom: 8px;

  ${ifProp(
    'isActive',
    css`
      background-color: #def1fd;
    `,
  )}

  ${ifProp(
    'isSubItems',
    css`
      padding-left: 20px;
      width: 420px;
    `,
  )}
`

const StyledName = styled(Text)<{ isActive?: boolean }>`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${theme('colors.black')};
  margin-left: 10px;

  ${ifProp(
    'isActive',
    css`
      font-weight: bold;
    `,
  )}
`

const StyledDate = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-left: auto;
  color: ${theme('colors.grey.7')};
  padding-right: 8px;
`

const DropdownFolder = styled(Box)`
  position: relative;
`

const Dropline = styled(Box)`
  background-color: #f0f0f0;
  width: 1px;
  height: 100%;
  position: absolute;
  left: 12px;
  top: 0px;
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
        >
          <DatasetType kind={item.kind} isActive={isActive || isActiveXl} />
          <StyledName isActive={isActive || isActiveXl}>{item.name}</StyledName>
          <StyledDate>{formatDate(item['create-time'])}</StyledDate>
        </Root>

        {isOpenFolder && isXl && (
          <DropdownFolder>
            <Dropline />
            <Box>
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
            </Box>
          </DropdownFolder>
        )}
      </Fragment>
    )
  },
)
