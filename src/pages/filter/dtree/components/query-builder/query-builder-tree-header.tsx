import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { EvalStatus } from '@core/enum/eval-status'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from './query-builder-search'

const TreeHeader = styled.div`
  width: 13%;
  min-width: 133px;
  display: flex;
  align-items: center;
`

const ResultsHeader = styled.div`
  width: 87%;
  display: flex;
  align-items: center;
`

interface IQueryBuilderTreeHeaderProps {
  className?: string
}

export const QueryBuilderTreeHeader = observer(
  ({ className }: IQueryBuilderTreeHeaderProps): ReactElement => {
    return (
      <div className={cn('flex bg-grey-tertiary', className)}>
        <TreeHeader className="border-r border-grey-light pl-4">
          <div className="font-medium mr-2">{t('dtree.tree')}</div>
        </TreeHeader>

        <ResultsHeader className="px-4">
          {dtreeStore.evalStatus === EvalStatus.Runtime && (
            <>
              <div className="flex px-2 whitespace-nowrap text-red-light text-12 bg-red-lighter rounded-xl">
                {t('error.runtimeProblem')}
              </div>

              <div className="h-1/3 w-1 bg-grey-disabled mx-3" />
            </>
          )}

          <div className="font-medium mr-3">{t('dtree.algorithm')}</div>

          <QueryBuilderSearch
            value={dtreeStore.algorithmFilterValue}
            onChange={(e: string) => dtreeStore.setAlgorithmFilterValue(e)}
            showSwitcher
            isSwitched={dtreeStore.algorithmFilterFullWord}
            onSwitch={dtreeStore.setAlgorithmFilterFullWord}
          />
        </ResultsHeader>
      </div>
    )
  },
)
