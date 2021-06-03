import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  title: string
  filters: Record<string, number>
}

const Root = styled(Box)`
  margin-bottom: 22px;
`

const TitleContainer = styled(Box)`
  display: flex;
  align-items: center;
`

const Title = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5e6366;
  margin: 0;
  margin-bottom: 6px;
`

const AmountGroup = styled(Title)`
  color: #0c65fd;
  margin-left: 5px;
`

const FilterContainer = styled(Box)`
  display: flex;
  align-items: center;
`

const Filters = styled(Box)`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px 18px;
`

const FilterName = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  margin: 0;
`

const FilterAmount = styled(FilterName)`
  color: #5e6366;
  margin-left: 5px;
`

export const SelectedFilterCard = observer(
  ({ title, filters }: Props): ReactElement => {
    const filterKeys = Object.keys(filters)

    const amountGroup = Object.values(filters).reduce((p, c) => p + c, 0)

    return (
      <Root>
        <TitleContainer>
          <Title>{title} </Title>
          <AmountGroup>{`(${amountGroup} variants)`}</AmountGroup>
        </TitleContainer>
        <Filters>
          {filterKeys.map(filterKey => (
            <FilterContainer key={filterKey}>
              <FilterName>{filterKey}</FilterName>
              <FilterAmount>{`(${filters[filterKey]})`}</FilterAmount>
            </FilterContainer>
          ))}
        </Filters>
      </Root>
    )
  },
)
