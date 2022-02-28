import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'

interface IValidateLocusConditionProps {
  value: string
  setIsErrorVisible: (arg: boolean) => void
  groupName?: string
  currentStepIndex?: number
}

export const validateLocusCondition = ({
  value,
  setIsErrorVisible,
  groupName,
  currentStepIndex,
}: IValidateLocusConditionProps): void => {
  let numberValue = value[3]
  let lastIndexOfName = 3

  if (+value[4] && value.length > 4) numberValue = value.slice(3, 5)

  if (numberValue) lastIndexOfName = 2 + numberValue.length

  if (
    value.slice(0, 3) !== 'chr' ||
    !+numberValue ||
    +numberValue > 23 ||
    value[lastIndexOfName + 1] !== ':' ||
    (!+value.slice(lastIndexOfName + 2) &&
      value.slice(lastIndexOfName + 2) !== '')
  ) {
    setIsErrorVisible(true)
  } else {
    setIsErrorVisible(false)

    const params = `{"locus":"${value}"}`

    if ((currentStepIndex || currentStepIndex === 0) && groupName) {
      dtreeStore.fetchStatFuncAsync(groupName, params)
    } else {
      filterStore.fetchStatFuncAsync(FuncStepTypesEnum.GeneRegion, params)
    }
  }
}
