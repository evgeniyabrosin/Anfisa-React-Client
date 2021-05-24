import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { EditSvg } from '../../ui/icons/edit'
import { Text } from '../../ui/text'

interface Props {
  group: string
  variants: Record<string, Record<string, number>>
}

const Root = styled(Box)`
  margin-top: 4px;
  margin-right: 10px;
`

const Title = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5e6366;
  margin: 0px;
  margin-right: 5px;
`

const FilterNameContainer = styled(Box)`
  display: flex;
  align-items: center;
`

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  background: #def1fd;
  border-radius: 10px;
  padding: 8px;
  margin-top: 8px;
`

const FilterValueName = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
`

const FilterValueAmount = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #a6adaf;
  margin: 0px;
  margin-left: 8px;
`

export const FilterItem = ({ group, variants }: Props): ReactElement => {
  const groupItemkeys = Object.keys(variants)

  return (
    <Root>
      <FilterNameContainer>
        <Title>{group}</Title>
        <EditSvg />
      </FilterNameContainer>

      <Content>
        {groupItemkeys.map(groupItemKey => {
          const amountValues: number[] = Object.values(variants[groupItemKey])

          return (
            <Box key={groupItemKey} style={{ display: 'flex' }}>
              <FilterValueName>{groupItemKey}</FilterValueName>
              {amountValues.length > 0 && (
                <FilterValueAmount>
                  ({amountValues.reduce((prev, cur) => prev + cur, 0)})
                </FilterValueAmount>
              )}
            </Box>
          )
        })}
      </Content>
    </Root>
  )
}
