import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { TFuncArgs, TNumericConditionBounds } from '@service-providers/common'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

interface IsavePanelAttributeProps {
  filterKind: FilterKindEnum
  attributeName?: string
  selectedVariants?: string[]
  value?: TNumericConditionBounds
  mode?: ModeTypes | undefined
  param?: TFuncArgs | undefined
}

export const savePanelAttribute = ({
  filterKind,
  attributeName,
  selectedVariants,
  value,
  mode,
  param,
}: IsavePanelAttributeProps) => {
  if (!attributeName) {
    return
  }

  switch (filterKind) {
    case FilterKindEnum.Func:
      filterStore.saveCurrentCondition([
        filterKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
        param!,
      ])
      break

    case FilterKindEnum.Numeric:
      filterStore.saveCurrentCondition([filterKind, attributeName, value!])
      break

    case FilterKindEnum.Enum:
      filterStore.saveCurrentCondition([
        filterKind,
        attributeName,
        getConditionJoinMode(mode),
        selectedVariants!,
      ])
      break
  }

  filterStore.setTouched(false)
}
