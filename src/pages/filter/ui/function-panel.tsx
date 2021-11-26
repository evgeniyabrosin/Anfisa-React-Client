import { Fragment, FunctionComponent, ReactElement, useState } from 'react'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { FilterFunctionEnum } from '@core/enum/filter-function.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { CompundHet } from './compound-het'
import { CustomInheritanceMode } from './custom-inheritance-mode'
import { GeneRegion } from './gene-region'
import { InheritanceMode } from './inheritance-mode'

const functionsMap: Record<string, any> = {
  GeneRegion,
  Inheritance_Mode: InheritanceMode,
  Custom_Inheritance_Mode: CustomInheritanceMode,
  Compound_Het: CompundHet,
}

const initialStateMap: Record<string, any> = {
  GeneRegion: {
    locus: '',
  },
  Inheritance_Mode: {
    problemGroups: [],
    variants: [],
  },
  Custom_Inheritance_Mode: {
    scenario: {},
    variants: [],
  },
  Compound_Het: {
    variants: [],
    approx: '',
    state: null,
  },
}

export const FunctionPanel = observer(
  (): ReactElement => {
    const [error, setError] = useState('')
    const selectedFilter = filterStore.selectedGroupItem

    const Component: FunctionComponent<Record<string, any>> =
      functionsMap[selectedFilter.name]

    const onSubmitAsync = async (values: any) => {
      const { err } = await filterStore.fetchStatFuncAsync(
        selectedFilter.name,
        values,
      )

      if (err) {
        setError(err)

        return
      }

      if (selectedFilter.name === FilterFunctionEnum.InheritanceMode) {
        const noArray = await datasetStore.setConditionsAsync([
          [
            'func',
            selectedFilter.name,
            '',
            values.variants,
            { problem_group: values.problemGroups },
          ],
        ])

        filterStore.addSelectedFilterGroup(
          'Inheritance',
          FilterFunctionEnum.InheritanceMode,
          [[FilterFunctionEnum.InheritanceMode, noArray.length]],
        )
      }

      if (selectedFilter.name === FilterFunctionEnum.CustomInheritanceMode) {
        const condition = [
          'func',
          FilterFunctionEnum.CustomInheritanceMode,
          '',
          values.variants,
          { scenario: values.scenario },
        ]

        const noArray = await datasetStore.setConditionsAsync(condition)

        filterStore.addSelectedFilterGroup(
          'Inheritance',
          FilterFunctionEnum.CustomInheritanceMode,
          [[FilterFunctionEnum.CustomInheritanceMode, noArray.length]],
        )
      }

      if (selectedFilter.name === FilterFunctionEnum.GeneRegion) {
        const noArray = await datasetStore.setConditionsAsync([
          ['func', selectedFilter.name, '', ['True'], values],
        ])

        filterStore.addSelectedFilterGroup(
          'Coordinates',
          FilterFunctionEnum.GeneRegion,
          [[FilterFunctionEnum.GeneRegion, noArray.length]],
        )
      }

      if (selectedFilter.name === FilterFunctionEnum.CompoundHet) {
        const noArray = await datasetStore.setConditionsAsync([
          [
            'func',
            selectedFilter.name,
            '',
            values.variants,
            { approx: values.approx || null, state: values.state || null },
          ],
        ])

        filterStore.addSelectedFilterGroup(
          'Inheritance',
          FilterFunctionEnum.CompoundHet,
          [[FilterFunctionEnum.CompoundHet, noArray.length]],
        )
      }
    }

    const handleClear = () => {
      datasetStore.removeFunctionConditionAsync(selectedFilter.name)

      filterStore.removeSelectedFilters({
        group: selectedFilter.vgroup,
        groupItemName: selectedFilter.name,
        variant: [selectedFilter.name, 0],
      })
    }

    if (!Component) {
      return <Fragment />
    }

    return (
      <div>
        <Formik
          initialValues={initialStateMap[selectedFilter.name]}
          enableReinitialize
          onSubmit={onSubmitAsync}
        >
          {props => (
            <div>
              <Component {...props} />

              {selectedFilter.name === FilterFunctionEnum.GeneRegion && (
                <span className="text-red-secondary text-14 leading-16px">
                  {error}
                </span>
              )}

              <div className="flex items-center justify-between mt-5">
                <Button
                  text={t('general.clear')}
                  onClick={() => {
                    handleClear()
                    props.resetForm()
                  }}
                />

                <Button text={t('general.add')} onClick={props.submitForm} />
              </div>
            </div>
          )}
        </Formik>
      </div>
    )
  },
)
