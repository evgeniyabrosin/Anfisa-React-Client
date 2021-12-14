import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { getSortedArray } from '@utils/getSortedArray'
import { CustomInheritanceModeContent } from './custom-inheritance-mode-content'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export const ModalSelectCustomInheritanceMode = observer(
  (): ReactElement => {
    const ref = useRef(null)

    const currentStepIndex = dtreeStore.currentStepIndex

    const currentGroup = dtreeStore.stepData[currentStepIndex].groups

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    let attrData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === groupName) {
          attrData = subGroup[currNo]
        }
      })
    })

    useEffect(() => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const params = datasetStore.isXL
        ? `{"scenario":{"2":["HG002"],"0-1":["HG003","HG004"]}}`
        : `{"scenario":{"2":["NA24385"],"0-1":["NA24143","NA24149"]}}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [firstSelectValue, setFirstSelectValue] = useState<string>('2')

    const [secondSelectValue, setSecondSelectValue] = useState<string>('0-1')

    const [thirdSelectValue, setThirdSelectValue] = useState<string>('0-1')

    const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

    const [resetValue, setResetValue] = useState('')

    const sendRequest = (type: string, value: string, multiData?: any[]) => {
      let selectedData: any[] = []

      if (type && value) {
        selectedData = [
          [type === 'first' ? value : firstSelectValue, attrData.family[0]],
          [type === 'second' ? value : secondSelectValue, attrData.family[1]],
          [type === 'third' ? value : thirdSelectValue, attrData.family[2]],
        ]
      }

      const newScenario = getSortedArray(multiData || selectedData)

      let scenarioString = ''

      newScenario.map((item, index) => {
        scenarioString += `"${item[0]}":["${item[1]
          .toString()
          .split(',')
          .join('","')}"]`

        if (newScenario[index + 1]) scenarioString += `,`
      })

      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const params = `{"scenario":{${scenarioString}}}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    const handleSetScenario = (group: string, value: string) => {
      if (group === attrData.family[0]) {
        setFirstSelectValue(value)
        sendRequest('first', value)
      }

      if (group === attrData.family[1]) {
        setSecondSelectValue(value)
        sendRequest('second', value)
      }

      if (group === attrData.family[2]) {
        setThirdSelectValue(value)
        sendRequest('third', value)
      }

      setResetValue('')
    }

    const handleReset = (name: string) => {
      if (name === InheritanceModeEnum.HomozygousRecessive_XLinked) {
        setFirstSelectValue('2')
        setSecondSelectValue('0-1')
        setThirdSelectValue('0-1')

        const multiData: any[] = [
          ['2', attrData.family[0]],
          ['0-1', attrData.family[1]],
          ['0-1', attrData.family[2]],
        ]

        sendRequest('', '', multiData)
      }

      if (name === InheritanceModeEnum.AutosomalDominant) {
        setFirstSelectValue('1-2')
        setSecondSelectValue('0')
        setThirdSelectValue('0')

        const multiData: any[] = [
          ['1-2', attrData.family[0]],
          ['0', attrData.family[1]],
          ['0', attrData.family[2]],
        ]

        sendRequest('', '', multiData)
      }

      if (name === InheritanceModeEnum.Compensational) {
        setFirstSelectValue('0')
        setSecondSelectValue('1-2')
        setThirdSelectValue('1-2')

        const multiData: any[] = [
          ['0', attrData.family[0]],
          ['1-2', attrData.family[1]],
          ['1-2', attrData.family[2]],
        ]

        sendRequest('', '', multiData)
      }

      if (name === 'empty') {
        setFirstSelectValue('--')
        setSecondSelectValue('--')
        setThirdSelectValue('--')

        const multiData: any[] = [
          ['--', attrData.family[0]],
          ['--', attrData.family[1]],
          ['--', attrData.family[2]],
        ]

        sendRequest('', '', multiData)
      }

      setResetValue(name)
    }

    const handleClose = () => {
      dtreeStore.closeModalSelectCustomInheritanceMode()
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectCustomInheritanceMode()
      dtreeStore.openModalAttribute(currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = (action: ActionType) => {
      dtreeStore.addSelectedFilter(variants[0][0])
      const params = { scenario: dtreeStore.scenario }

      addAttributeToStep(action, 'func', [null], params)
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectCustomInheritanceMode()
    }

    return (
      <ModalBase refer={ref} minHeight={250}>
        <HeaderModal
          groupName={dtreeStore.groupNameToChange}
          handleClose={handleClose}
        />

        <CustomInheritanceModeContent
          attrData={attrData}
          handleSetScenario={handleSetScenario}
          selectStates={selectStates}
          handleReset={handleReset}
          resetValue={resetValue}
        />

        <SelectModalButtons
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          handleAddAttribute={handleAddAttribute}
          disabled={!variants}
          currentGroup={currentGroup}
        />
      </ModalBase>
    )
  },
)
