import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from './query-builder-search'

const TreeHeader = styled.div`
  width: 13%;
  display: flex;
  align-items: center;
`

const ResultsHeader = styled.div`
  width: 87%;
  display: flex;
  align-items: center;
`

export const QueryBuilderTreeHeader = observer((): ReactElement => {
  return (
    <div className="flex border-b border-grey-light h-auto min-h-50">
      <TreeHeader className="border-r border-grey-light pl-4">
        <div className="font-medium mr-2">{t('dtree.tree')}</div>
      </TreeHeader>

      <ResultsHeader className="px-4">
        <div className="font-medium mr-3">{t('dtree.algorithm')}</div>

        <QueryBuilderSearch
          value={dtreeStore.algorithmFilterValue}
          onChange={(e: string) => dtreeStore.setAlgorithmFilterValue(e)}
        />
      </ResultsHeader>
    </div>
  )
})
