import { Fragment, FunctionComponent, ReactElement } from 'react'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import { isArray } from 'lodash'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { CompundHet } from './compound-het'
import { CompoundRequest } from './compound-request'
import { CustomInheritanceMode } from './custom-inheritance-mode'
import { GeneRegion } from './gene-region'
import { InheritanceMode } from './inheritance-mode'

const functionsMap: Record<string, any> = {
  GeneRegion,
  Inheritance_Mode: InheritanceMode,
  Custom_Inheritance_Mode: CustomInheritanceMode,
  Compound_Het: CompundHet,
  Compound_Request: CompoundRequest,
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
    if (filterStore.error) return

    if (isArray(values.variants) && values.variants.length === 0) {
      toast.warning(t('filter.chooseProblemGroup'), {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      })

      return
    }

    if (selectedFilter.name === FuncStepTypesEnum.InheritanceMode) {
      const noArray = await datasetStore.setConditionsAsync([
        [
          'func',
          selectedFilter.name,
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
      const condition = [
        'func',
        FuncStepTypesEnum.CustomInheritanceMode,
        '',
        values.variants,
        { scenario: values.scenario },
      ]

      const noArray = await datasetStore.setConditionsAsync(condition)

      filterStore.addSelectedFilterGroup(
        'Inheritance',
        FuncStepTypesEnum.CustomInheritanceMode,
        [[FuncStepTypesEnum.CustomInheritanceMode, noArray.length]],
      )
    }

    if (selectedFilter.name === FuncStepTypesEnum.GeneRegion) {
      const noArray = await datasetStore.setConditionsAsync([
        ['func', selectedFilter.name, '', ['True'], values],
      ])

      filterStore.addSelectedFilterGroup(
        'Coordinates',
        FuncStepTypesEnum.GeneRegion,
        [[FuncStepTypesEnum.GeneRegion, noArray.length]],
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
  }

  const handleClear = () => {
    datasetStore.removeFunctionConditionAsync(selectedFilter.name)

    filterStore.removeSelectedFilters({
      group: selectedFilter.vgroup,
      groupItemName: selectedFilter.name,
      variant: [selectedFilter.name, 0],
    })

    filterStore.resetStatFuncData()
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
        {props => (
          <div>
            <Component {...props} />

            <div className="flex items-center justify-between mt-5">
              <Button
                text={t('general.clear')}
                variant={'secondary'}
                onClick={() => {
                  handleClear()
                  props.resetForm()
                }}
              />

              <Button
                text={t('general.add')}
                onClick={props.submitForm}
                disabled={!!filterStore.error}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
