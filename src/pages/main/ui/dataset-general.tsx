import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import { Text } from '@ui/text'
import { InfoList } from './info-list'

const StyledTitle = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${theme('colors.grey.7')};
  margin-bottom: 8px;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${theme('colors.grey.6')};
`

export const DatasetGeneral = (): ReactElement => {
  return (
    <div>
      <StyledTitle>{t('home.general')}</StyledTitle>

      <InfoList />
    </div>
  )
}
