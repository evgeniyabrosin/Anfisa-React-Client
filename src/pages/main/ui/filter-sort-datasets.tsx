import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { t } from '@i18n'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { Input } from '@ui/input'
import { SortItem } from './sort-item'

const Root = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const SortButtons = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${theme('colors.grey.6')};
`

export const FilterSortDatasets = observer(
  (): ReactElement => (
    <Root>
      <Input
        placeholder={t('home.searchForADataset')}
        value={dirinfoStore.filterValue}
        onChange={e => {
          dirinfoStore.setFilterValue(e.target.value)
        }}
      />

      <SortButtons>
        <SortItem text={t('home.name')} sortType={SortDatasets.Name} />
        <SortItem
          text={t('home.createdAt')}
          sortType={SortDatasets.CreatedAt}
        />
      </SortButtons>
    </Root>
  ),
)
