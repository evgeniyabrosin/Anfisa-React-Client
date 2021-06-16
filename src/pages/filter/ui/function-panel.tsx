import { Fragment, FunctionComponent, ReactElement, useState } from 'react'
import { Formik } from 'formik'
import { observer } from 'mobx-react-lite'

import { FilterFunctionEnum } from '@core/enum/filter-function.enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { CompundHet } from './compound-het'
import { GeneRegion } from './gene-region'
import { InheritanceMode } from './inheritance-mode'

const functionsMap: Record<string, any> = {
  GeneRegion,
  Inheritance_Mode: InheritanceMode,
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
      const { err } = await datasetStore.fetchStatFuncAsync(
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
      datasetStore.removeFunctionCondition(selectedFilter.name)
    }

    if (!Component) {
      return <Fragment />
    }

    return (
      <div>
        <span style={{ color: 'red' }}>{error}</span>

        <Formik
          initialValues={initialStateMap[selectedFilter.name]}
          enableReinitialize
          onSubmit={onSubmitAsync}
        >
          {props => (
            <div>
              <Component {...props} />

              <Button text="Add" onClick={props.submitForm} />
              <Button text="Clear" onClick={handleClear} />
            </div>
          )}
        </Formik>
      </div>
    )
  },
)
