import get from 'lodash/get'
import noop from 'lodash/noop'
import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import { StatListType } from '../../..'
import filterStore from '@store/filter'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

type Props = StatListType & {
  onChange?: (checked: boolean) => void
  className?: string
  amount?: number
  group?: string
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

const StyledAmout = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #a6adaf;
  margin: 0;
  margin-left: 8px;
`

const SelectedAmount = styled('span')`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #0c65fd;
  margin: 0;
`

export const FilterRefinerGroupItem = observer(
  ({
    name,
    onChange,
    className,
    amount,
    group,
    ...rest
  }: Props): ReactElement => {
    const checked = get(
      filterStore,
      `selectedFilters[${group}][${name}]`,
      false,
    )

    const selectedAmounts: number[] = Object.values(
      get(filterStore, `selectedFilters[${group}][${name}]`, {}),
    )

    const selectedSum = selectedAmounts.reduce((prev, cur) => prev + cur, 0)

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
          onChange={event => onChange && onChange(event.target.checked)}
        />
        <StyledGroupItem
          key={name}
          onClick={amount !== 0 ? handleSelect : noop}
        >
          {name}
        </StyledGroupItem>

        {amount !== 0 && (
          <StyledAmout>
            {'('}
            {selectedSum !== 0 && (
              <SelectedAmount>{`${selectedSum}/`}</SelectedAmount>
            )}
            {`${amount})`}
          </StyledAmout>
        )}
      </Root>
    )
  },
)
