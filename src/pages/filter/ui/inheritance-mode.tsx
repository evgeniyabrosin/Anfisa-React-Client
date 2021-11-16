import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { Form, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'

export const InheritanceMode = observer(
  ({
    values,
    setFieldValue,
  }: FormikProps<{ problemGroups: string[]; variants: string[] }>) => {
    const [variants, setVariants] = useState([])
    const [problemGroups, setProblemGroups] = useState<string[]>([])

    const fetchStatFuncAsync = async (
      param?: Record<string, string | string[]>,
    ) => {
      const statFuncData = await filterStore.fetchStatFuncAsync(
        'Inheritance_Mode',
        param || {},
      )

      const filteredVaraints = statFuncData?.variants?.filter(
        item => item[1] > 0,
      )

      setVariants(filteredVaraints || ([] as any))
    }

    const handleChangeAsync = async (
      e: ChangeEvent<HTMLInputElement>,
      problemGroup: string,
    ) => {
      const value = e.target.checked
        ? [...values.problemGroups, problemGroup]
        : values.problemGroups.filter(group => group !== problemGroup)

      await fetchStatFuncAsync({
        problem_group: value,
      })
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

    return (
      <Form>
        <div className="flex items-center justify-between">
          <p className="text-14 leading-16px font-bold text-grey-blue mt-4">
            Problem group
          </p>

          <p
            className="text-12 text-blue-bright leading-14px cursor-pointer"
            onClick={() => {
              setFieldValue('variants', [])
              setFieldValue('problemGroups', [])
            }}
          >
            Reset
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          {problemGroups.map(problemGroup => (
            <div key={problemGroup} className="flex items-center">
              <Checkbox
                checked={values.problemGroups.includes(problemGroup)}
                onChange={e => handleChangeAsync(e, problemGroup)}
              />
              <span className="text-14 leading-16px ml-2">{problemGroup}</span>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white my-4" />

        <div className="flex items-center justify-between">
          <p className="text-14 leading-14px text-grey-blue">
            {values.variants?.length} Selected
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
                checked={values.variants.includes(variant[0])}
                onChange={e => {
                  const value = e.target.checked
                    ? [...values.variants, variant[0]]
                    : values.variants.filter(item => item !== variant[0])

                  setFieldValue('variants', value)
                }}
              />
              <span className="text-14 leading-16px ml-2">{variant[0]}</span>
              <span className="text-14 leading-16px text-grey-blue ml-1">{`(${variant[1]})`}</span>
            </div>
          )
        })}
      </Form>
    )
  },
)
