import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Text } from '@ui/text'
import { SelectedFilterCard } from './selected-filter-card'

const NoResultsText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #6c6c6c;
  margin-left: auto;
  margin-right: auto;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

export const QueryResults = observer(
  (): ReactElement => {
    const keys = Object.keys(filterStore.selectedFilters)

    if (keys.length === 0) {
      return <NoResultsText>{t('general.noResultsFound')}</NoResultsText>
    }

    return (
      <Fragment>
        {keys.map(subGroupKey => (
          <div
            key={subGroupKey}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {Object.keys(filterStore.selectedFilters[subGroupKey]).map(
              title => (
                <SelectedFilterCard
                  key={title}
                  title={title}
                  filters={filterStore.selectedFilters[subGroupKey][title]}
                />
              ),
            )}
          </div>
        ))}
      </Fragment>
    )
  },
)
