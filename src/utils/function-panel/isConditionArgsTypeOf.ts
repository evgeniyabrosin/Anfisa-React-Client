import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { TFuncArgs } from '@service-providers/common/common.interface'

export const isConditionArgsTypeOf = <T extends TFuncArgs>(
  groupItemName: string,
  args: TFuncArgs,
  funcType: FuncStepTypesEnum,
): args is T => groupItemName === funcType
