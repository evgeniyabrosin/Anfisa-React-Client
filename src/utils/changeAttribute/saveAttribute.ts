import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import modalsControlStore from '@pages/filter/dtree/components/modals/modals-control-store'
import { TFuncArgs } from '@service-providers/common'
import {
  ActionTypes,
  AtomModifyingActionName,
} from '@service-providers/decision-trees'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

interface ISaveAttributeProps {
  filterKind: FilterKindEnum
  filterName: string
  values: string[]
  mode?: ModeTypes
  param?: TFuncArgs
}

type TAttribute = [
  filterKind: FilterKindEnum,
  filterName: string,
  values: string[],
  mode?: ModeTypes | undefined,
  param?: TFuncArgs,
]

export const saveAttribute = ({
  filterKind,
  filterName,
  values,
  mode,
  param,
}: ISaveAttributeProps) => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const { location } = modalsControlStore

  const attribute: TAttribute = [filterKind, filterName, values]

  const conditionsJoinMode = getConditionJoinMode(mode)

  attribute.splice(2, 0, conditionsJoinMode)

  if (param) attribute.push(param)

  dtreeStore.fetchDtreeSetAsync({
    ds: datasetStore.datasetName,
    code,
    instr: [
      ActionTypes.ATOM,
      AtomModifyingActionName.EDIT,
      location,
      attribute,
    ],
  })
}
