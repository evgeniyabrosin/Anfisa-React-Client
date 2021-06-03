import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Box } from '@ui/box'
import { Button } from '@ui/button'
import { Text } from '@ui/text'
import { QueryResults } from './query-results'

const Root = styled(Box)`
  margin-left: auto;
`

const HeaderContainer = styled(Box)`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 16px;
`

const Title = styled(Text)`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #3e4345;
  margin: 0px;
`

const StyledButton = styled(Button)`
  height: 32px;
`

const AmountResults = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #263238;
  width: 100%;
  margin: 0;
  margin-top: 4px;
`

const formatData = (filters: any) => {
  const result: any[] = []

  Object.keys(filters).map(key =>
    Object.keys(filters[key]).forEach(keyItem => {
      result.push(['enum', keyItem, '', Object.keys(filters[key][keyItem])])
    }),
  )

  return result
}

const amountSelectedFilters = (filters: any) => {
  const keys = Object.keys(filters)

  const amountArray: number[] = keys
    .map(keyGroup =>
      Object.values(filters[keyGroup]).map((item: any) => Object.values(item)),
    )
    .flat(2)
    .map(Number)

  return amountArray.reduce((p, c) => p + c, 0)
}

export const QuerySelected = observer(
  (): ReactElement => {
    const history = useHistory()
    const params = useParams()

    const selectedAmount = amountSelectedFilters(filterStore.selectedFilters)

    const handleClickAsync = async () => {
      datasetStore.addConditions(formatData(filterStore.selectedFilters))

      await datasetStore.fetchWsListAsync()
      history.push(`${Routes.WS}?ds=${params.get('ds')}`)
    }

    return (
      <Root>
        <HeaderContainer>
          <Title>{t('filter.selectedVariants')}</Title>
          <StyledButton
            text={t('filter.show', {
              amount: selectedAmount,
            })}
            onClick={handleClickAsync}
          />

          <AmountResults>
            {t('filter.amountOf', { selected: selectedAmount, all: '0' })}
          </AmountResults>
        </HeaderContainer>

        <QueryResults />
      </Root>
    )
  },
)
