import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import { IInheritanceModeArgs, TVariant } from '@service-providers/common'

export interface IControlProps {
  values: string[]
  hasErrors: boolean
  param: IInheritanceModeArgs
  mode: ModeTypes | undefined
  clearValue?: () => void
}

export interface IInheritanceModeConditionProps {
  problemGroups: string[]
  initialVariants: string[] | undefined
  initialProblemGroups: string[] | undefined
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  controls?: (props: IControlProps) => ReactElement | null
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
}

export interface IInheritanceModeProblemGroupsProps {
  problemGroups: string[]
  handleSetProblemGroups: (checked: boolean, problemGroup: string) => void
  selectedPropblemGroups: string[]
  handleReset: () => void
}

export interface IInheritanceModeVariantsControlsProps {
  selectedVariants: string[]
  selectAllVariants: () => void
  clearAllVariants: () => void
  attributeSubKind: string | undefined
  mode: ModeTypes | undefined
  toggleMode: (mode: ModeTypes) => void
}

export interface IInheritanceModeVariantsProps {
  filteredVariants: TVariant[]
  selectedVariants: string[]
  isFetching: boolean
  handleSetVariants: (checked: boolean, variantName: string) => void
}
