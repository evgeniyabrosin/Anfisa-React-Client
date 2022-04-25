import { makeAutoObservable, toJS } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import {
  AttributeKinds,
  TCondition,
  TNumericConditionBounds,
  TPropertyStatus,
  TVariant,
} from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'
import { getCurrentModeType } from '@utils/getCurrentModeType'

// TODO: we can create more general store for using it also in dtree
export class CurrentFilterStore {
  constructor() {
    makeAutoObservable(this)
  }

  public get attributeStatus(): TPropertyStatus | undefined {
    return filterStore.selectedAttributeStatus
  }

  public get attributeName(): string | undefined {
    return this.attributeStatus?.name
  }

  public get attributeSubKind(): string | undefined {
    if (this.attributeStatus && 'sub-kind' in this.attributeStatus) {
      return this.attributeStatus['sub-kind']
    }

    return undefined
  }

  public get initialCondition(): TCondition | undefined {
    return toJS(filterStore.selectedCondition)
  }

  public get initialNumericValue(): TNumericConditionBounds | undefined {
    if (this.initialCondition?.[0] === FilterKindEnum.Numeric) {
      return this.initialCondition[2]
    }

    return undefined
  }

  public get initialEnumVariants(): string[] | undefined {
    if (this.initialCondition?.[0] === FilterKindEnum.Enum) {
      return this.initialCondition[3]
    }

    return undefined
  }

  public get initialEnumMode(): ModeTypes | undefined {
    if (this.initialCondition?.[0] === FilterKindEnum.Enum) {
      return getCurrentModeType(this.initialCondition[2])
    }

    return undefined
  }

  public get enumVariants(): TVariant[] {
    if (this.attributeStatus?.kind !== AttributeKinds.ENUM) {
      return []
    }
    const variants: TVariant[] = []
    const conditionVariants = this.initialEnumVariants
    const statusVariants = this.attributeStatus.variants ?? []
    const conditionIncludes = new Array<boolean>(
      conditionVariants?.length ?? 0,
    ).fill(false)

    for (const variant of statusVariants) {
      const conditionIndex = conditionVariants?.indexOf(variant[0]) ?? -1
      if (variant[1] > 0 || conditionIndex > -1) {
        variants.push(variant)
      }
      if (conditionIndex > -1) {
        conditionIncludes[conditionIndex] = true
      }
    }

    if (conditionVariants) {
      for (let i = 0; i < conditionIncludes.length; ++i) {
        if (!conditionIncludes[i]) {
          variants.push([conditionVariants[i], 0])
        }
      }
    }

    return variants
  }

  public saveEnum(variants: string[], mode: ModeTypes | undefined): void {
    if (!this.attributeName) {
      return
    }

    filterStore.saveCurrentCondition([
      FilterKindEnum.Enum,
      this.attributeName,
      getConditionJoinMode(mode),
      variants,
    ])
  }

  public saveNumeric(value: TNumericConditionBounds): void {
    if (!this.attributeName) {
      return
    }

    filterStore.saveCurrentCondition([
      FilterKindEnum.Numeric,
      this.attributeName,
      value,
    ])
  }
}

export default new CurrentFilterStore()
