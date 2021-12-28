import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { Form, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'

export interface IInheritanceFormValues {
  problemGroups: string[]
  variants: string[]
}

export const InheritanceMode = observer(
  ({ values, setFieldValue }: FormikProps<IInheritanceFormValues>) => {
    const cachedValues = filterStore.readFilterCondition<IInheritanceFormValues>(
      FuncStepTypesEnum.InheritanceMode,
    )

    const [variants, setVariants] = useState([])
    const [problemGroups, setProblemGroups] = useState<string[]>([])

    const [problemGroupValues, variantsValues] = [
      cachedValues?.problemGroups || values.problemGroups,
      cachedValues?.variants || values.variants,
    ]

    const fetchStatFuncAsync = async (
      param?: Record<string, string | string[]>,
    ) => {
      const statFuncData = await filterStore.fetchStatFuncAsync(
        FuncStepTypesEnum.InheritanceMode,
        JSON.stringify(param) || JSON.stringify({ problem_group: [] }),
      )

      const filteredVaraints = statFuncData?.variants?.filter(
        item => item[1] > 0,
      )

      if (!statFuncData.variants || statFuncData.variants.length === 0) {
        filterStore.setError('out of choice')
      } else {
        filterStore.setError('')
      }

      setVariants(filteredVaraints || ([] as any))
    }

    const handleChangeAsync = async (
      e: ChangeEvent<HTMLInputElement>,
      problemGroup: string,
    ) => {
      const value = e.target.checked
        ? [...values.problemGroups, problemGroup]
        : values.problemGroups.filter(group => group !== problemGroup)

      setFieldValue('variants', [])
      setFieldValue('problemGroups', value)
    }

    useEffect(() => {
      const initAsync = async () => {
        const [problemGroupsData] = await Promise.all([
          filterStore.fetchProblemGroupsAsync(),
          fetchStatFuncAsync(),
        ])

        setProblemGroups(problemGroupsData)
      }

      initAsync()
    }, [])

    useEffect(() => {
      fetchStatFuncAsync({
        problem_group: problemGroupValues,
      })
    }, [problemGroupValues])

    useEffect(() => {
      filterStore.setFilterCondition<IInheritanceFormValues>(
        FuncStepTypesEnum.InheritanceMode,
        {
          problemGroups: values.problemGroups,
          variants: values.variants,
        },
      )
    }, [values.problemGroups, values.variants])

    const handleSetFieldValueAsync = async () => {
      setFieldValue('problemGroups', [])

      await fetchStatFuncAsync()
    }

    return (
      <Form>
        <div className="flex items-center justify-between">
          <p className="text-14 leading-16px font-bold text-grey-blue mt-4">
            Problem group
          </p>

          <p
            className="text-12 text-blue-bright leading-14px cursor-pointer"
            onClick={handleSetFieldValueAsync}
          >
            Reset
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          {problemGroups.map(problemGroup => (
            <div key={problemGroup} className="flex items-center">
              <Checkbox
                checked={problemGroupValues.includes(problemGroup)}
                onChange={e => handleChangeAsync(e, problemGroup)}
              />
              <span className="text-14 leading-16px ml-2">{problemGroup}</span>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white my-4" />

        <div className="flex items-center justify-between">
          <p className="text-14 leading-14px text-grey-blue">
            {variantsValues?.length} Selected
          </p>

          <p
            className="text-12 leading-14px text-blue-bright cursor-pointer"
            onClick={() => setFieldValue('variants', [])}
          >
            {t('general.clearAll')}
          </p>
        </div>

        {variants.map(variant => {
          if (variant[1] === 0) {
            return <Fragment />
          }

          return (
            <div key={variant[0]} className="flex items-center mt-4">
              <Checkbox
                checked={variantsValues.includes(variant[0])}
                onChange={e => {
                  const value = e.target.checked
                    ? [...variantsValues, variant[0]]
                    : variantsValues.filter(item => item !== variant[0])

                  setFieldValue('variants', value)
                }}
              />
              <span className="text-14 leading-16px ml-2">{variant[0]}</span>
              <span className="text-14 leading-16px text-grey-blue ml-1">{`(${variant[1]})`}</span>
            </div>
          )
        })}

        {variants.length === 0 && (
          <div className="flex justify-center w-full mt-2 text-14 text-grey-blue">
            Out of choice. Select problem group.
          </div>
        )}
      </Form>
    )
  },
)
