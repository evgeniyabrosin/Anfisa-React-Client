import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import styled from 'styled-components'

import filterStore from '@store/filter'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  name: string
  amount: number
  handleSelect: (checked: boolean) => void
}

const Root = styled(Box)`
  display: flex;
  margin-bottom: 11px;
  align-items: center;
`

const StyledGroupItem = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 0;
  margin-left: 8px;
`

const AmoutText = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 8px;
`

export const SelectedGroupItem = observer(
  ({ name, amount, handleSelect }: Props): ReactElement => {
    const checked = get(
      filterStore,
      `selectedFilters[${filterStore.selectedGroupItem.vgroup}][${filterStore.selectedGroupItem.name}][${name}]`,
      false,
    )

    return (
      <Root>
        <Checkbox
          checked={checked}
          style={{ cursor: 'pointer' }}
          indeterminate={filterStore.selectedGroupItem.name === name}
          onChange={event => {
            handleSelect(event.target.checked)
          }}
        />

        <StyledGroupItem key={name}>{name}</StyledGroupItem>

        {amount !== 0 && <AmoutText>{`(${amount})`}</AmoutText>}
      </Root>
    )
  },
)
