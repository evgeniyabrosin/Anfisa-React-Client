import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { EditSvg } from '../../ui/icons/edit'
import { Text } from '../../ui/text'

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
  flex-wrap: wrap;
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

export const FilterItem = (): ReactElement => {
  return (
    <Root>
      <FilterNameContainer>
        <Title>Inheritance</Title>
        <EditSvg />
      </FilterNameContainer>

      <Content>
        <FilterValueName>Inheritance Mode</FilterValueName>
        <FilterValueAmount>(1029)</FilterValueAmount>
      </Content>
    </Root>
  )
}
