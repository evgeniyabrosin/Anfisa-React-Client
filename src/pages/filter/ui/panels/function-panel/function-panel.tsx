import { Fragment, FunctionComponent, ReactElement } from 'react'
import { Formik } from 'formik'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { CompundHet } from './components/compound-het'
import { CompoundRequest } from './components/compound-request'
import { CustomInheritanceMode } from './components/custom-inheritance-mode'
import { GeneRegion } from './components/gene-region'
import { InheritanceMode } from './components/inheritance-mode'

const functionsMap: Record<string, any> = {
  GeneRegion,
  Inheritance_Mode: InheritanceMode,
  Custom_Inheritance_Mode: CustomInheritanceMode,
  Compound_Het: CompundHet,
  Compound_Request: CompoundRequest,
}

const initialStateMap: Record<string, any> = {
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
  Compound_Request: {
    variants: [],
    approx: '',
    state: null,
    request: [],
  },
}

export const FunctionPanel = (): ReactElement => {
  const selectedFilter = filterStore.selectedGroupItem

  const Component: FunctionComponent<Record<string, any>> =
    functionsMap[selectedFilter.name]

  const onSubmitAsync = async (values: any) => {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    if (selectedFilter.name === FuncStepTypesEnum.InheritanceMode) {
      const noArray = await datasetStore.setConditionsAsync([
        [
          'func',
          FuncStepTypesEnum.InheritanceMode,
          '',
          values.variants,
          {
            problem_group:
              values.problemGroups.length > 0 ? values.problemGroups : null,
          },
        ],
      ])

      filterStore.addSelectedFilterGroup(
        'Inheritance',
        FuncStepTypesEnum.InheritanceMode,
        [[FuncStepTypesEnum.InheritanceMode, noArray.length]],
      )
    }

    if (selectedFilter.name === FuncStepTypesEnum.CustomInheritanceMode) {
      const noArray = await datasetStore.setConditionsAsync([
        [
          'func',
          FuncStepTypesEnum.CustomInheritanceMode,
          'OR',
          ['True'],
          { scenario: values.scenario },
        ],
      ])

      filterStore.addSelectedFilterGroup(
        'Inheritance',
        FuncStepTypesEnum.CustomInheritanceMode,
        [[FuncStepTypesEnum.CustomInheritanceMode, noArray.length]],
      )
    }

    if (selectedFilter.name === FuncStepTypesEnum.CompoundHet) {
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
        FuncStepTypesEnum.CompoundHet,
        [[FuncStepTypesEnum.CompoundHet, noArray.length]],
      )
    }

    if (selectedFilter.name === FuncStepTypesEnum.CompoundRequest) {
      const noArray = await datasetStore.setConditionsAsync([
        [
          'func',
          selectedFilter.name,
          '',
          [values.variants[0][0]],
          {
            approx: values.approx || null,
            state: values.state || null,
            request: values.request || null,
          },
        ],
      ])

      filterStore.addSelectedFilterGroup(
        'Inheritance',
        FuncStepTypesEnum.CompoundRequest,
        [[FuncStepTypesEnum.CompoundRequest, noArray.length]],
      )
    }

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  if (!Component) {
    return <Fragment />
  }

  const initialValues = { ...initialStateMap, ...filterStore.filterCondition }

  return (
    <div>
      <Formik
        initialValues={initialValues[selectedFilter.name]}
        enableReinitialize
        onSubmit={onSubmitAsync}
      >
        {props => <Component {...props} />}
      </Formik>
    </div>
  )
}
