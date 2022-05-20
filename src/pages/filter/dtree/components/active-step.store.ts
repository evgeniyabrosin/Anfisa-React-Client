import { toJS } from 'mobx'

import dtreeStore from '@store/dtree'

export enum ActiveStepOptions {
  StartedVariants = 'startedVariants',
  ReturnedVariants = 'returnedVariants',
}

export enum CreateEmptyStepPositions {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  FINAL = 'FINAL',
}

class ActiveStep {
  activeStepIndex: number = 0
  activeStepOption: ActiveStepOptions = ActiveStepOptions.StartedVariants

  setActiveStep(index: number, option: ActiveStepOptions) {
    this.activeStepIndex = index
    this.activeStepOption = option
  }

  get stepIndexForApi(): string {
    const { dtreeStepIndices, stepList } = dtreeStore

    const lastIndexFromIndexes = dtreeStepIndices[dtreeStepIndices.length - 1]

    // add final step index to dtreeStepIndices
    if (lastIndexFromIndexes) {
      const indexForFinalStep = +lastIndexFromIndexes + 2

      dtreeStepIndices.push(String(indexForFinalStep))
    }

    const isTreeEmpty = dtreeStepIndices.length === 0
    const firstStepIndex = '0'

    const emptyStepIndex = stepList.findIndex(
      ({ groups, isFinalStep }) => groups.length === 0 && !isFinalStep,
    )
    const treeHasEmptyStep = emptyStepIndex !== -1

    if (!isTreeEmpty && treeHasEmptyStep) {
      const copiedIndex = dtreeStepIndices[emptyStepIndex - 1] ?? firstStepIndex
      dtreeStepIndices.splice(emptyStepIndex, 0, copiedIndex)
    }

    // index is undefined in First step and Final step in Empty Tree
    const indexFromIndexes =
      dtreeStepIndices[this.activeStepIndex] ?? firstStepIndex

    // 1)Case: For adding attribute in empty step
    const isFirstElement = !dtreeStepIndices[this.activeStepIndex - 1]
    if (this.activeStepIndex === emptyStepIndex && !isFirstElement) {
      const nextStepIndex = dtreeStepIndices[this.activeStepIndex + 1]

      return nextStepIndex
    }

    // 2)Case: For other cases
    const isReturnedVariants =
      this.activeStepOption === ActiveStepOptions.ReturnedVariants

    const indexForApi = isReturnedVariants
      ? String(+indexFromIndexes + 1)
      : indexFromIndexes

    return indexForApi
  }

  makeStepActive(index: number, option: ActiveStepOptions) {
    this.setActiveStep(index, option)
    dtreeStore.changeStepDataActiveStep(index, option, this.stepIndexForApi)
  }

  createEmptyStep(stepIndex: number, position: CreateEmptyStepPositions) {
    const previousStepIndex = stepIndex - 1
    const nextStepIndex = stepIndex + 1

    switch (position) {
      case CreateEmptyStepPositions.FINAL:
        dtreeStore.insertEmptyStep(position, previousStepIndex)

        this.makeStepActive(stepIndex, ActiveStepOptions.StartedVariants)
        break

      case CreateEmptyStepPositions.BEFORE:
        dtreeStore.insertEmptyStep(position, stepIndex)

        this.makeStepActive(stepIndex, ActiveStepOptions.StartedVariants)
        break

      case CreateEmptyStepPositions.AFTER:
        dtreeStore.insertEmptyStep(position, stepIndex)

        this.makeStepActive(nextStepIndex, ActiveStepOptions.StartedVariants)
        break

      default:
        break
    }
  }
}

export default new ActiveStep()
