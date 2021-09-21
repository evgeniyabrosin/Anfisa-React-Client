import { ReactElement, useEffect, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Select } from '@ui/select'
import { getFuncParams } from '@utils/getFuncParams'
import { getSortedArray } from '@utils/getSortedArray'
import { ModsDivider } from './mods-divider'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div`
  width: 580px;
  height: 250px;
  background: white;
  border-radius: 0.5rem;
`

export const ModalEditCustomInheritanceModeFunc = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () =>
      dtreeStore.closeModalEditCustomInheritanceModeFunc(),
    )

    const currentStepIndex = dtreeStore.currentStepIndex
    const currentGroupIndex = dtreeStore.groupIndexToChange

    const currentGroup =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    let attrData: any
    let resetData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    const scenarioOptions = ['--', '0', '0-1', '1', '1-2', '2']

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

      const scenarioString = getFuncParams(currentGroup)
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

    const handleDeleteInstruction = () => {
      dtreeStore.removeStepData(currentGroupIndex)
      dtreeStore.closeModalEditCustomInheritanceModeFunc()
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
      dtreeStore.closeModalEditCustomInheritanceModeFunc()
    }

    const handleSaveChanges = () => {
      const params = { scenario: dtreeStore.scenario }

      dtreeStore.updateStepData(currentGroupIndex, params)
      dtreeStore.closeModalEditCustomInheritanceModeFunc()
    }

    return (
      <ModalView className="bg-grey-blue">
        <ModalContent
          ref={ref}
          className="flex flex-col justify-between py-4 px-4"
        >
          <div className="flex w-full justify-between items-center font-medium mb-5">
            <div>{dtreeStore.groupNameToChange}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="flex items-center justify-between w-full mb-1 text-14">
            <div>{t('dtree.scenario')}</div>

            {attrData.family.map((group: string, index: number) => (
              <div key={group}>
                <span>{group}</span>

                <Select
                  onChange={(e: any) =>
                    handleSetScenario(group, e.target.value)
                  }
                  className="w-auto ml-1"
                  options={scenarioOptions}
                  value={selectStates[index]}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-1 w-full text-14">
            <div className="flex w-1/2">
              <span>{t('dtree.reset')}</span>

              <Select
                options={resetData.available}
                onChange={(e: any) => handleReset(e.target.value)}
                className="w-full ml-2"
                reset
              />
            </div>

            <div className="flex text-14 text-blue-bright">
              <div className="flex items-center">
                <Checkbox checked={false} className="mr-1" />

                <span>{t('dtree.all')}</span>
              </div>

              <ModsDivider />

              <div className="flex items-center">
                <Checkbox checked={false} className="mr-1" />

                <span>{t('dtree.not')}</span>
              </div>
            </div>
          </div>

          <div className="h-full mt-4 overflow-y-auto text-14">
            {variants ? (
              variants.map((variant: any) => (
                <div key={variant} className="flex items-center mb-2">
                  <Checkbox
                    checked={true}
                    disabled={true}
                    className="-mt-0.5 mr-1 cursor-pointer"
                  />

                  <span className="text-black">{variant[0]}</span>

                  <span className="text-grey-blue ml-2">
                    {variant[1]} {t('dtree.variants')}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full text-14 text-grey-blue">
                {t('dtree.noFilters')}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              text={t('dtree.deleteInstruction')}
              hasBackground={false}
              className="text-black border-red-secondary hover:text-white hover:bg-red-secondary"
              onClick={handleDeleteInstruction}
            />

            <div className="flex">
              <Button
                text={t('general.cancel')}
                hasBackground={false}
                className="mr-2 text-black hover:bg-blue-bright hover:text-white"
                onClick={handleClose}
              />

              <div className="relative">
                <Button
                  disabled={!variants}
                  text={t('dtree.saveChanges')}
                  onClick={handleSaveChanges}
                />
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalView>
    )
  },
)
