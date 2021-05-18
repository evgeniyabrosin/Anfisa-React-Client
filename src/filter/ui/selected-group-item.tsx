import { ReactElement, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import styled from 'styled-components'

import filterStore from '../../store/filter'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

interface Props {
  name: string
  amount: string
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

export const SelectedGroupItem = ({ name, amount }: Props): ReactElement => {
  const [checked, setChecked] = useState(false)

  return (
    <Root>
      <Checkbox
        checked={checked}
        style={{ cursor: 'pointer' }}
        indeterminate={filterStore.selectedGroupItem.name === name}
        onChange={event => setChecked(event.target.checked)}
      />

      <StyledGroupItem key={name}>{name}</StyledGroupItem>

      <AmoutText>{`(${amount})`}</AmoutText>
    </Root>
  )
}
