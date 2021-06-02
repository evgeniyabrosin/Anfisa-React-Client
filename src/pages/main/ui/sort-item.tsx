import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { SortDirection } from '@core/sort-direction.enum'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { SortSvg } from '@icons/sort'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  text: string
  sortType: SortDatasets
}

const Root = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 8px;
  cursor: pointer;
`

const StyledText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${theme('colors.grey.7')};
  margin-bottom: 8px;
  margin-top: 8px;
`

export const SortItem = observer(
  ({ text, sortType }: Props): ReactElement => {
    const sortIconTransform =
      dirinfoStore.sortDirections[sortType] === SortDirection.ASC
        ? 'rotate(180deg) scaleX(-1)'
        : 'none'

    const handleClick = () => {
      if (dirinfoStore.sortType === sortType) {
        dirinfoStore.setSortDirection()
      } else {
        dirinfoStore.setSortType(sortType)
      }
    }

    return (
      <Root onClick={handleClick}>
        <StyledText
          style={{
            color:
              sortType === dirinfoStore.sortType
                ? '#0C65FD'
                : theme('colors.grey.7'),
          }}
        >
          {text}
        </StyledText>
        <SortSvg
          style={{ transform: sortIconTransform, marginLeft: 8 }}
          fill={sortType === dirinfoStore.sortType ? '#0C65FD' : '#CCCCCC'}
        />
      </Root>
    )
  },
)
