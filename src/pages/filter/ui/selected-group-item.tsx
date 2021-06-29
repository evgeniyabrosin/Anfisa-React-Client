import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import filterStore from '@store/filter'

interface Props {
  name: string
  amount: number
  handleSelect: (checked: boolean) => void
}

const Root = styled.div`
  display: flex;
  margin-bottom: 11px;
  align-items: center;
`

const StyledGroupItem = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 0;
  margin-left: 8px;
`

const AmoutText = styled.span`
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
    )

    return (
      <Root>
        <Checkbox
          checked={Number.isInteger(checked)}
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
