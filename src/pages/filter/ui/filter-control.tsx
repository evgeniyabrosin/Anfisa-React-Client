import { ReactElement } from 'react'
import styled from 'styled-components'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { FilterDropdown } from './filter-dropdown'
import { VisualEditorSwitch } from './visual-editor-switch'

const Root = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 19px;
`

const StyledText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

export const FilterControl = (): ReactElement => (
  <Root>
    <StyledText>{t('filter.method')}</StyledText>

    <FilterDropdown
      options={[FilterMethodEnum.Refiner, FilterMethodEnum.Query]}
      value={FilterMethodEnum.Query}
      onChange={args => filterStore.setMethod(args.value as FilterMethodEnum)}
    />

    <VisualEditorSwitch />

    <FilterDropdown
      options={['Pick a saved query']}
      onChange={() => null}
      placeholder="Pick a saved query"
    />
  </Root>
)
