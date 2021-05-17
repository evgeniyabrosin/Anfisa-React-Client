import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { FilterDropdown } from './filter-dropdown'

const Root = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-right: 17px;
`

export const FilterControl = (): ReactElement => {
  return (
    <Root>
      <StyledText>{t('filter.method')}</StyledText>
      <FilterDropdown />
    </Root>
  )
}
