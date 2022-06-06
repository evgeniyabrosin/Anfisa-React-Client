import { makeAutoObservable } from 'mobx'

import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { IStepData } from './dtree.store'

export enum ActiveStepOptions {
  StartedVariants = 'startedVariants',
  ReturnedVariants = 'returnedVariants',
}

export enum CreateEmptyStepPositions {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  FINAL = 'FINAL',
}

class StepStore {
  activeStepIndex: number = 0
  activeStepOption: ActiveStepOptions = ActiveStepOptions.StartedVariants

  private _steps: IStepData[] = []

  get steps() {
    return this._steps
  }

  get filteredSteps(): IStepData[] {
    const searchValue = dtreeStore.algorithmFilterValue.toLowerCase()

    if (!searchValue) return this.steps

    const filteredSteps = this.steps.filter(({ groups }) => {
      return groups.some(condition => {
        const name = condition[1].toLowerCase()
        if (name.includes(searchValue)) return true

        const valueVariants = condition[3]
        if (!valueVariants) return false

        const valueVariantList = Object.values(valueVariants)

        return valueVariantList.some(varaintName => {
          if (typeof varaintName !== 'string') return false

          return varaintName?.toLowerCase().includes(searchValue)
        })
      })
    })

    return filteredSteps
  }

  get stepIndexForApi(): string {
    const { dtreeStepIndices } = dtreeStore

    const lastIndexFromIndexes = dtreeStepIndices[dtreeStepIndices.length - 1]

    // add final step index to dtreeStepIndices
    if (lastIndexFromIndexes) {
      const indexForFinalStep = +lastIndexFromIndexes + 2

      dtreeStepIndices.push(String(indexForFinalStep))
    }

    const isTreeEmpty = dtreeStepIndices.length === 0
    const firstStepIndex = '0'

    const emptyStepIndex = this.steps.findIndex(
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

  constructor() {
    makeAutoObservable(this)
  }

  setActiveStep(index: number, option: ActiveStepOptions) {
    this.activeStepIndex = index
    this.activeStepOption = option
  }

  changeStepDataActiveStep = (
    index: number,
    option: ActiveStepOptions,
    indexForApi: string,
  ) => {
    this._steps.forEach(element => {
      element.isActive = false
      element.isReturnedVariantsActive = false
    })

    if (option === ActiveStepOptions.StartedVariants) {
      this._steps[index].isActive = true
    } else {
      this._steps[index].isReturnedVariantsActive = true
    }

    dtreeStore.stat.setQuery({
      datasetName: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      stepIndex: indexForApi,
    })
  }

  makeStepActive(index: number, option: ActiveStepOptions) {
    this.setActiveStep(index, option)
    this.changeStepDataActiveStep(index, option, this.stepIndexForApi)
  }

  insertEmptyStep(position: CreateEmptyStepPositions, index: number) {
    const localSteps = [...this.steps]

    localSteps.forEach(element => {
      element.isActive = false

      return element
    })

    const startSpliceIndex =
      position === CreateEmptyStepPositions.BEFORE ? index : index + 1

    localSteps.splice(startSpliceIndex, 0, {
      step: index,
      groups: [],
      excluded: true,
      isActive: true,
      isReturnedVariantsActive: false,
      conditionPointIndex:
        startSpliceIndex < localSteps.length - 1
          ? localSteps[startSpliceIndex].conditionPointIndex
          : localSteps[localSteps.length - 1].returnPointIndex,
      returnPointIndex: null,
    })

    localSteps.forEach((item, currNo: number) => {
      item.step = currNo + 1
    })

    this._steps = localSteps
  }

  createEmptyStep(stepIndex: number, position: CreateEmptyStepPositions) {
    const previousStepIndex = stepIndex - 1
    const nextStepIndex = stepIndex + 1

    switch (position) {
      case CreateEmptyStepPositions.FINAL:
        this.insertEmptyStep(position, previousStepIndex)

        this.makeStepActive(stepIndex, ActiveStepOptions.StartedVariants)
        break

      case CreateEmptyStepPositions.BEFORE:
        this.insertEmptyStep(position, stepIndex)

        this.makeStepActive(stepIndex, ActiveStepOptions.StartedVariants)
        break

      case CreateEmptyStepPositions.AFTER:
        this.insertEmptyStep(position, stepIndex)

        this.makeStepActive(nextStepIndex, ActiveStepOptions.StartedVariants)
        break

      default:
        break
    }
  }

  setSteps(stepList: IStepData[]): void {
    this._steps = stepList
  }

  removeStep(index: number) {
    const stepData = this.steps

    stepData.splice(index, 1)

    stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })

    this.makeStepActive(stepData.length - 1, ActiveStepOptions.StartedVariants)
  }
}

export default new StepStore()
