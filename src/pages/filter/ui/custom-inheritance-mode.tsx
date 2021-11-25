import { useEffect, useState } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import { getSortedArray } from '@utils/getSortedArray'
import { CustomInheritanceModeContent } from './query-builder/ui/custom-inheritance-mode-content'

export const CustomInheritanceMode = observer(() => {
  const [firstSelectValue, setFirstSelectValue] = useState<string>('2')
  const [secondSelectValue, setSecondSelectValue] = useState<string>('0-1')
  const [thirdSelectValue, setThirdSelectValue] = useState<string>('0-1')
  const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]

  useEffect(() => {
    const paramsContent = datasetStore.isXL
      ? `{"scenario":{"2":["HG002"],"0-1":["HG003","HG004"]}}`
      : `{"scenario":{"2":["NA24385"],"0-1":["NA24143","NA24149"]}}`

    const params = JSON.parse(paramsContent)

    filterStore.fetchStatFuncAsync('Custom_Inheritance_Mode', params)
  }, [])

  let attrData: any
  let resetData: any

  const statList = toJS(datasetStore.dsStat['stat-list'])
  const subGroups = Object.values(getQueryBuilder(statList))

  subGroups.map(subGroup => {
    subGroup.map((item, currNo) => {
      if (item.name === FuncStepTypesEnum.CustomInheritanceMode) {
        attrData = subGroup[currNo]
      }

      if (item.name === FuncStepTypesEnum.InheritanceMode) {
        resetData = subGroup[currNo]
      }
    })
  })

  const sendRequestAsync = async (
    type: string,
    value: string,
    multiData?: any[],
  ) => {
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
    const params = JSON.parse(`{"scenario":{${scenarioString}}}`)

    filterStore.fetchStatFuncAsync('Custom_Inheritance_Mode', params || {}, [])
  }

  const handleSetScenario = (group: string, value: string) => {
    if (group === attrData.family[0]) {
      setFirstSelectValue(value)
      sendRequestAsync('first', value)
    }

    if (group === attrData.family[1]) {
      setSecondSelectValue(value)
      sendRequestAsync('second', value)
    }

    if (group === attrData.family[2]) {
      setThirdSelectValue(value)
      sendRequestAsync('third', value)
    }
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

      sendRequestAsync('', '', multiData)
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

      sendRequestAsync('', '', multiData)
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

      sendRequestAsync('', '', multiData)
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

      sendRequestAsync('', '', multiData)
    }
  }

  return (
    <CustomInheritanceModeContent
      attrData={attrData}
      resetData={resetData}
      handleSetScenario={handleSetScenario}
      selectStates={selectStates}
      handleReset={handleReset}
    />
  )
})
