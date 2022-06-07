import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { DtreeStatFuncStore } from '@store/dtree/dtree-stat-func.store'
import { FilterStatFuncStore } from '@store/filter/filter-stat-func.store'
import { IScenario } from '@service-providers/common'

export interface IControlProps {
  hasErrors: boolean
  param: any
  mode: ModeTypes | undefined
  clearValue?: () => void
}

export interface ICustomInheritanceModeConditionProps {
  problemGroups: string[]
  initialScenario: IScenario
  initialMode: ModeTypes | undefined
  attributeSubKind: string | undefined
  controls?: (props: IControlProps) => ReactElement | null
  statFuncStore: DtreeStatFuncStore | FilterStatFuncStore
}
export interface IHandleSetComplexScenarioProps {
  preparedValue: string
  problemGroups: string[]
  setScenario: (scenario: any) => void
}
