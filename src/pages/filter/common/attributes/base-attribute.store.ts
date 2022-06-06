import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { savePanelAttribute } from '@pages/filter/refiner/components/middle-column/panels/utils/save-pannel-attribute'
import {
  AttributeKinds,
  TCondition,
  TNumericConditionBounds,
  TPropertyStatus,
  TVariant,
} from '@service-providers/common'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'
import { getCurrentModeType } from '@utils/getCurrentModeType'
export interface IBaseAttributeStoreParams {
  getAttributeStatus: () => TPropertyStatus | undefined
  getInitialCondition: () => TCondition | undefined
}

export class BaseAttributeStore {
  private readonly getAttributeStatus: () => TPropertyStatus | undefined
  private readonly getInitialCondition: () => TCondition | undefined
  public isShowZeroVariants = false

  constructor(params: IBaseAttributeStoreParams) {
    this.getAttributeStatus = params.getAttributeStatus
    this.getInitialCondition = params.getInitialCondition

    makeAutoObservable(this)
  }

  public get attributeStatus(): TPropertyStatus | undefined {
    return this.getAttributeStatus()
  }

  public get initialCondition(): TCondition | undefined {
    return this.getInitialCondition()
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
      if (variant[1] > 0 || this.isShowZeroVariants || conditionIndex > -1) {
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

  public get initialNumericValue(): TNumericConditionBounds | undefined {
    if (this.initialCondition?.[0] === FilterKindEnum.Numeric) {
      return this.initialCondition[2]
    }

    return undefined
  }

  public saveEnum = (
    selectedVariants: string[],
    mode: ModeTypes | undefined,
    isRefiner?: boolean,
  ) => {
    if (!this.attributeName) {
      return
    }

    // TODO: will be fixed after enum condition is fixed
    if (isRefiner) {
      savePanelAttribute({
        filterKind: FilterKindEnum.Enum,
        attributeName: this.attributeName,
        mode,
        selectedVariants,
      })
    } else {
      changeEnumAttribute(mode, selectedVariants)
      modalsVisibilityStore.closeModalEnum()
    }
  }

  public addEnum = (
    action: ActionType,
    mode: ModeTypes | undefined,
    selectedVariants: string[],
  ) => {
    addAttributeToStep(
      action,
      FilterKindEnum.Enum,
      selectedVariants,
      null,
      mode,
    )

    modalsVisibilityStore.closeModalEnum()
  }

  public setIsShowZeroVariants = (value: boolean) => {
    this.isShowZeroVariants = value
  }
}
