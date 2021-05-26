import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import { Box } from '@ui/box'
import { DatasetsList } from './datasets-list'
import { FilterSortDatasets } from './filter-sort-datasets'

const Root = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 440px;
`

const Title = styled(Box)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 16px;
  color: ${theme('colors.grey.1')};
`

export const Datasets = (): ReactElement => {
  return (
    <Root>
      <Title>{t('home.datasets')}</Title>

      <FilterSortDatasets />

      <DatasetsList />
    </Root>
  )
}
