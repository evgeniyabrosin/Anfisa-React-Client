import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import { Box } from '@ui/box'
import { DatasetsList } from './datasets-list'
import { FilterSortDatasets } from './filter-sort-datasets'

const Title = styled(Box)`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 16px;
  color: ${theme('colors.grey.1')};
`

export const Datasets = (): ReactElement => {
  return (
    <div>
      <Title>{t('home.datasets')}</Title>

      <FilterSortDatasets />

      <DatasetsList />
    </div>
  )
}
