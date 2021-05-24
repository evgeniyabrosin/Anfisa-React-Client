import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { useParams } from '../../core/hooks/use-params'
import { t } from '../../i18n/i18n'
import { Routes } from '../../router/routes.enum'
import { Box } from '../../ui/box'
import { Button } from '../../ui/button'
import { Text } from '../../ui/text'
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
  font-family: 'Work Sans', sans-serif;
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
  font-family: 'Work Sans', sans-serif;
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

export const QuerySelected = (): ReactElement => {
  const history = useHistory()
  const params = useParams()

  return (
    <Root>
      <HeaderContainer>
        <Title>{t('filter.selectedVariants')}</Title>
        <StyledButton
          text={t('filter.show', { amount: '1.24 mil' })}
          onClick={() => history.push(`${Routes.WS}?ds=${params.get('ds')}`)}
        />

        <AmountResults>
          {t('filter.amountOf', { selected: '1.24', all: '1.25' })}
        </AmountResults>
      </HeaderContainer>

      <QueryResults />
    </Root>
  )
}
