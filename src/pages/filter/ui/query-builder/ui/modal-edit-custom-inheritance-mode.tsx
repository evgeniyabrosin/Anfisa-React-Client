import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Select } from '@ui/select'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getFuncParams } from '@utils/getFuncParams'
import { getSortedArray } from '@utils/getSortedArray'
import { AllNotModalMods } from './all-not-modal-mods'
import { EditModalButtons } from './edit-modal-buttons'
import { EditModalVariants } from './edit-modal-variants'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export const ModalEditCustomInheritanceMode = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalEditCustomInheritanceMode())

    const currentStepIndex = dtreeStore.currentStepIndex
    const currentGroupIndex = dtreeStore.groupIndexToChange

    const currentGroup =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    let attrData: any
    let resetData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === groupName) {
          attrData = subGroup[currNo]
        }

        if (item.name === FuncStepTypesEnum.InheritanceMode) {
          resetData = subGroup[currNo]
        }
      })
    })

    useEffect(() => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const scenarioString = getFuncParams(
        groupName,
        currentGroup[currentGroup.length - 1],
      )
        .slice(10)
        .replace(/\s+/g, '')

      const params = `{"scenario":${scenarioString}}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [firstSelectValue, setFirstSelectValue] = useState<string>(
      getSelectedValue(attrData.family[0]),
    )

    const [secondSelectValue, setSecondSelectValue] = useState<string>(
      getSelectedValue(attrData.family[1]),
    )

    const [thirdSelectValue, setThirdSelectValue] = useState<string>(
      getSelectedValue(attrData.family[2]),
    )

    const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

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
    }

    function getSelectedValue(group: string): any {
      const data: any[] = Object.entries(
        currentGroup[currentGroup.length - 1].scenario,
      )

      let value = '--'

      data?.map((item, index) => {
        if (group && item[1].includes(group)) {
          value = data[index][0]
        }
      })

      return value
    }

    const handleReset = (name: string) => {
      if (
        name === InheritanceModeEnum.HomozygousRecessive ||
        name === InheritanceModeEnum.XLinked
      ) {
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
    }

    const handleClose = () => {
      dtreeStore.closeModalEditCustomInheritanceMode()
    }

    const handleSaveChanges = () => {
      const params = { scenario: dtreeStore.scenario }

      changeFunctionalStep(params)
      dtreeStore.closeModalEditCustomInheritanceMode()
    }

    return (
      <ModalBase refer={ref} minHeight={250}>
        <HeaderModal
          groupName={dtreeStore.groupNameToChange}
          handleClose={handleClose}
        />

        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.scenario')}</div>

          {attrData.family.map((group: string, index: number) => (
            <div key={group}>
              <span>{group}</span>

              <Select
                onChange={(e: any) => handleSetScenario(group, e.target.value)}
                className="w-auto ml-1"
                options={selectOptions}
                value={selectStates[index]}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full mt-4 text-14">
          <div className="flex w-1/2">
            <span>{t('dtree.reset')}</span>

            <Select
              options={resetData.available}
              onChange={(e: any) => handleReset(e.target.value)}
              className="w-full ml-2"
              reset
            />
          </div>

          <AllNotModalMods />
        </div>

        <EditModalVariants variants={variants} disabled={true} />

        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={handleSaveChanges}
          disabled={!variants}
        />
      </ModalBase>
    )
  },
)
