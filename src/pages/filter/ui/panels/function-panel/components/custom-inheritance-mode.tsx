import React, { useEffect, useState } from 'react'
import { FormikProps } from 'formik'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { GlbPagesNames } from '@glb/glb-names'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import { getSortedArray } from '@utils/getSortedArray'
import { CustomInheritanceModeContent } from '../../../query-builder/ui/custom-inheritance-mode-content'
import { PanelButtons } from './panelButtons'

export interface ICustomInheritanceModeProps {
  scenario: any
  variants: string[]
}

export interface ICustomInheritanceFormValues {
  first: string
  second: string
  third: string
  reset: string
  scenario: string | undefined
}

export const CustomInheritanceMode = observer(
  ({
    setFieldValue,
    submitForm,
    resetForm,
  }: FormikProps<ICustomInheritanceModeProps>) => {
    const cachedValues =
      filterStore.readFilterCondition<ICustomInheritanceFormValues>(
        FuncStepTypesEnum.CustomInheritanceMode,
      )

    const { first, second, third, reset, scenario } = cachedValues || {}

    const [firstSelectValue, setFirstSelectValue] = useState(first || '')
    const [secondSelectValue, setSecondSelectValue] = useState(second || '')
    const [thirdSelectValue, setThirdSelectValue] = useState(third || '')
    const [filterScenario, setFilterScenario] = useState(scenario || '')

    const selectStates = [firstSelectValue, secondSelectValue, thirdSelectValue]
    const [resetValue, setResetValue] = useState(reset || '')
    const variants = filterStore.statFuncData.variants

    useEffect(() => {
      filterStore.setFilterCondition<ICustomInheritanceFormValues>(
        FuncStepTypesEnum.CustomInheritanceMode,
        {
          first: firstSelectValue,
          second: secondSelectValue,
          third: thirdSelectValue,
          reset: resetValue,
          scenario: filterScenario,
        },
      )
    }, [
      firstSelectValue,
      secondSelectValue,
      thirdSelectValue,
      resetValue,
      filterScenario,
    ])

    useEffect(() => {
      const params = `{"scenario":${
        filterScenario ? `{${filterScenario}}` : '{}'
      }}`

      filterStore.fetchStatFuncAsync('Custom_Inheritance_Mode', params)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (variants) setFieldValue('variants', variants)
    }, [setFieldValue, variants])

    let attrData: any

    const statList = toJS(datasetStore.dsStat['stat-list'])
    const subGroups = Object.values(getQueryBuilder(statList))

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === FuncStepTypesEnum.CustomInheritanceMode) {
          attrData = subGroup[currNo]
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
          [
            type === 'first' ? value : firstSelectValue || '--',
            attrData.family[0],
          ],
          [
            type === 'second' ? value : secondSelectValue || '--',
            attrData.family[1],
          ],
          [
            type === 'third' ? value : thirdSelectValue || '--',
            attrData.family[2],
          ],
        ]
      }

      let scenarioString = ''

      const newScenario = getSortedArray(multiData || selectedData)

      newScenario.map((item, index) => {
        scenarioString += `"${item[0]}":["${item[1]
          .toString()
          .split(',')
          .join('","')}"]`

        if (newScenario[index + 1]) scenarioString += ','
      })

      const params = `{"scenario":{${scenarioString}}}`

      setFilterScenario(scenarioString)

      filterStore.method === GlbPagesNames.Refiner &&
        setFieldValue('scenario', Object.fromEntries(newScenario))
      filterStore.fetchStatFuncAsync('Custom_Inheritance_Mode', params)
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

      setResetValue(name)
    }

    const handleResetFields = () => {
      filterStore.clearFilterCondition(FuncStepTypesEnum.CustomInheritanceMode)

      setFirstSelectValue('--')
      setSecondSelectValue('--')
      setThirdSelectValue('--')
      setResetValue('empty')
    }

    return (
      <React.Fragment>
        <CustomInheritanceModeContent
          problemGroups={attrData.family}
          handleSetScenario={handleSetScenario}
          selectStates={selectStates}
          handleReset={handleReset}
          resetValue={resetValue}
        />

        <PanelButtons
          selectedFilterName={filterStore.selectedGroupItem.name}
          selectedFilterGroup={filterStore.selectedGroupItem.vgroup}
          onSubmit={submitForm}
          resetForm={resetForm}
          resetFields={handleResetFields}
          disabled={!variants}
        />
      </React.Fragment>
    )
  },
)
