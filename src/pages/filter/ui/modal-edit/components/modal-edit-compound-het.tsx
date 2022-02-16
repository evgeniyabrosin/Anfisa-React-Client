import { ReactElement, useEffect, useRef, useState } from 'react'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { AllNotModalMods } from '../../query-builder/ui/all-not-modal-mods'
import { ApproxStateModalMods } from '../../query-builder/ui/approx-state-modal-mods'
import { DisabledVariantsAmount } from '../../query-builder/ui/disabled-variants-amount'
import { HeaderModal } from '../../query-builder/ui/header-modal'
import { ModalBase } from '../../query-builder/ui/modal-base'
import { getApprox } from '../../query-builder/ui/modal-select-compound-het'
import { EditModalButtons } from './edit-modal-buttons'

export interface IParams {
  approx: any
  state?: string[] | null
  default?: string
  request?: any[]
}

export const ModalEditCompoundHet = observer((): ReactElement => {
  const ref = useRef(null)

  const currentStepIndex = dtreeStore.currentStepIndex
  const currentGroupIndex = dtreeStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const groupName = dtreeStore.groupNameToChange

  const variants = dtreeStore.statFuncData.variants

  const approxValues: string[] = []
  const approxOptions: string[] = []
  let attrData: any

  const subGroups = Object.values(dtreeStore.getQueryBuilder)

  subGroups.map(subGroup => {
    subGroup.map((item, currNo) => {
      if (item.name === groupName) {
        attrData = subGroup[currNo]
      }
    })
  })

  attrData['approx-modes'].map((mode: string[]) => {
    approxOptions.push(mode[1])
    approxValues.push(mode[0])
  })

  const [stateCondition, setStateCondition] = useState(getDefaultValue('state'))

  const [approxCondition, setApproxCondition] = useState(
    getDefaultValue('approx'),
  )

  const getStateOptions = () => {
    const state = get(currentGroup[currentGroup.length - 1], 'state')
    const defaultValue = get(currentGroup[currentGroup.length - 1], 'default')

    if (!state) return ['-current-']

    return defaultValue === null || defaultValue ? state : ['-current-', state]
  }

  const stateOptions: string[] = getStateOptions()

  function getDefaultValue(type: string) {
    if (type === 'approx') {
      const approx = get(currentGroup[currentGroup.length - 1], 'approx')

      if (!approx) return 'transcript'

      return `${approx}`
    }

    if (type === 'state') {
      const state = get(currentGroup[currentGroup.length - 1], 'state')

      const defaultValue = get(currentGroup[currentGroup.length - 1], 'default')

      if (state === undefined) return '-current-'

      if (defaultValue === null) return '-current-'

      return defaultValue ? defaultValue : state
    }
  }

  useEffect(() => {
    const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

    const params = `{"approx":${getApprox(approxCondition)},"state":${
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`
    }}`

    dtreeStore.setCurrentStepIndexForApi(indexForApi)

    dtreeStore.fetchStatFuncAsync(groupName, params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dtreeStore.closeModalEditCompoundHet()
  }

  const handleSaveChanges = () => {
    const params: IParams = { approx: approxCondition }

    if (stateCondition) {
      params.state =
        JSON.stringify(stateOptions) === JSON.stringify(['-current-'])
          ? null
          : stateOptions
    }

    changeFunctionalStep(params)
    dtreeStore.closeModalEditCompoundHet()
  }

  const handleSetCondition = (value: string, type: string) => {
    const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

    if (type === 'approx') {
      setApproxCondition(value)

      const params = `{"approx":${getApprox(value)},"state":${
        stateCondition !== '-current-' ? `"${stateCondition}"` : null
      }}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    if (type === 'state') {
      setStateCondition(value)

      const params = `{"approx":${getApprox(approxCondition)},"state":${
        value !== '-current-' ? `"${value}"` : null
      }}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }
  }

  return (
    <ModalBase refer={ref} minHeight={250}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={handleClose}
      />

      <div className="flex justify-between w-full mt-4 text-14">
        <ApproxStateModalMods
          approxOptions={approxOptions}
          approxValues={approxValues}
          approxCondition={approxCondition}
          stateOptions={stateOptions}
          stateCondition={stateCondition}
          handleSetCondition={handleSetCondition}
        />

        <AllNotModalMods />
      </div>

      <DisabledVariantsAmount variants={variants} disabled={true} />

      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        disabled={!variants}
      />
    </ModalBase>
  )
})
