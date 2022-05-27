import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { SolutionControl } from '@components/solution-control'

const MIN_CODE_LENGTH = 13

export const SolutionControlDtree = observer((): ReactElement => {
  const { activeDtree, availableDtrees } = filterDtreesStore

  return (
    <SolutionControl
      selected={activeDtree}
      solutions={availableDtrees}
      isCreateDisabled={dtreeStore.dtreeCode.length < MIN_CODE_LENGTH}
      controlName={t('solutionControl.decisionTree')}
      onCreate={filterDtreesStore.createDtree}
      onApply={filterDtreesStore.setActiveDtree}
      onModify={filterDtreesStore.modifyDtree}
      onDelete={filterDtreesStore.deleteDtree}
    />
  )
})
