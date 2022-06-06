import { ReactElement, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { InheritanceModeProblemGroups } from './components/inheritance-mode-problem-groups'
import { InheritanceModeVariants } from './components/inheritance-mode-variants'
import { InheritanceModeVariantsControls } from './components/inheritance-mode-variants-controls'
import { IInheritanceModeConditionProps } from './inheritance-mode.interface'

export const InheritanceModeCondition = observer(
  ({
    problemGroups,
    initialVariants,
    initialProblemGroups,
    initialMode,
    attributeSubKind,
    statFuncStore,
    controls,
  }: IInheritanceModeConditionProps): ReactElement => {
    const [mode, setMode] = useState(initialMode)
    const { variants } = statFuncStore
    const [selectedVariants, setSelectedVariants] = useState(
      initialVariants ?? [],
    )

    const [selectedPropblemGroups, setSelectedProblemGroups] = useState(
      initialProblemGroups ?? [],
    )

    const filteredVariants = useMemo(() => {
      return (
        variants?.filter(
          ([variantName, variantValue]) =>
            selectedVariants.includes(variantName) || variantValue > 0,
        ) ?? []
      )
    }, [selectedVariants, variants])

    const handleSetProblemGroups = (checked: boolean, problemGroup: string) => {
      if (checked) {
        setSelectedProblemGroups([...selectedPropblemGroups, problemGroup])
      } else {
        setSelectedProblemGroups(
          selectedPropblemGroups.filter(
            selectedPropblemGroup => selectedPropblemGroup !== problemGroup,
          ),
        )
      }
      filterStore.setTouched(true)
    }

    const handleSetVariants = (checked: boolean, variant: string) => {
      if (checked) {
        setSelectedVariants([...selectedVariants, variant])
      } else {
        setSelectedVariants(
          selectedVariants.filter(
            selectedVariant => selectedVariant !== variant,
          ),
        )
      }
      filterStore.setTouched(true)
    }

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      filterStore.setTouched(true)
    }

    const selectAllVariants = () => {
      const allVariantsNames = filteredVariants?.map(
        ([variantName]) => variantName,
      )
      setSelectedVariants(allVariantsNames)
      filterStore.setTouched(true)
    }

    const clearAllVariants = () => {
      setSelectedVariants([])
      setMode(undefined)
    }

    const handleReset = () => {
      setSelectedProblemGroups([])
      setSelectedVariants([])
      setMode(undefined)
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.InheritanceMode,
        param: JSON.stringify({
          problem_group: selectedPropblemGroups,
        }),
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPropblemGroups])

    return (
      <>
        <InheritanceModeProblemGroups
          problemGroups={problemGroups}
          selectedPropblemGroups={selectedPropblemGroups}
          handleSetProblemGroups={handleSetProblemGroups}
          handleReset={handleReset}
        />

        <InheritanceModeVariantsControls
          selectedVariants={selectedVariants}
          selectAllVariants={selectAllVariants}
          clearAllVariants={clearAllVariants}
          attributeSubKind={attributeSubKind}
          mode={mode}
          toggleMode={toggleMode}
        />

        <InheritanceModeVariants
          filteredVariants={filteredVariants}
          selectedVariants={selectedVariants}
          handleSetVariants={handleSetVariants}
          isFetching={statFuncStore.isFetching}
        />

        {controls &&
          controls({
            values: selectedVariants,
            hasErrors:
              !selectedVariants.length || !selectedPropblemGroups.length,
            clearValue: handleReset,
            param: { problem_group: selectedPropblemGroups },
            mode,
          })}
      </>
    )
  },
)
