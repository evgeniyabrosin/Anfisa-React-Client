import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { Box } from './box'

const Root = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #6c6c6c;
`

export const NoResultsFound = (): ReactElement => {
  return <Root>{t('general.noResultsFound')}</Root>
}
