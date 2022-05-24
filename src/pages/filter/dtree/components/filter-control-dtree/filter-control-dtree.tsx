import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { SolutionControl } from '@components/solution-control'
import { DatasetCreationButton } from '@pages/ws/ui/control-panel/dataset-creation-button'

const MIN_CODE_LENGTH = 13

export const FilterControlDtree = observer((): ReactElement => {
  const { activeDtree, availableDtrees } = filterDtreesStore

  return (
    <>
      <SolutionControl
        selected={activeDtree}
        solutions={availableDtrees}
        isCreateDisabled={dtreeStore.dtreeCode.length < MIN_CODE_LENGTH}
        controlName={t('solutionControl.decisionTree')}
        onCreate={dtreeName => filterDtreesStore.createDtree(dtreeName)}
        onApply={dtreeName => filterDtreesStore.setActiveDtree(dtreeName)}
        onModify={dtreeName => filterDtreesStore.modifyDtree(dtreeName)}
        onDelete={dtreeName => filterDtreesStore.deleteDtree(dtreeName)}
      />
      <DatasetCreationButton />
    </>
  )
})
