import { observer } from 'mobx-react-lite'
import { ReactElement, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import { StatListType } from '../../..'
import filterStore from '../../store/filter'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

type Props = StatListType & {
  onChange?: () => void
  className?: string
}

const Root = styled(Box)<{ isIndeterminate?: boolean }>`
  display: flex;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 24px;
  align-items: center;

  ${ifProp(
    'isIndeterminate',
    css`
      background-color: #def1fd;
    `,
  )}
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

const StyledCheckbox = styled(Checkbox)`
  background: #ffffff;
  border: 2px solid #e3e5e5;
  box-sizing: border-box;
  border-radius: 2px;
  width: 16px;
  height: 16px;
`

export const FilterRefinerGroupItem = observer(
  ({ name, onChange, className, ...rest }: Props): ReactElement => {
    const [checked, setChecked] = useState(false)
    const isIndeterminate = filterStore.selectedGroupItem.name === name

    const handleSelect = () => {
      filterStore.setSelectedGroupItem({ name, ...rest })
    }

    return (
      <Root isIndeterminate={isIndeterminate} className={className}>
        <StyledCheckbox
          checked={checked}
          style={{ cursor: 'pointer' }}
          indeterminate={isIndeterminate}
          onChange={event =>
            onChange ? onChange() : setChecked(event.target.checked)
          }
        />
        <StyledGroupItem key={name} onClick={onChange ?? handleSelect}>
          {name}
        </StyledGroupItem>
      </Root>
    )
  },
)
