/* eslint-disable max-lines */
import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { FilterCountsType } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { getApiUrl } from '@core/get-api-url'
import { CreateEmptyStepPositions } from '@pages/filter/dtree/components/active-step.store'
import { TFilteringStatCounts } from '@service-providers/common'
import {
  IDsStatArguments,
  IStatfuncArguments,
} from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { addToActionHistory } from '@utils/addToActionHistory'
import { calculateAcceptedVariants } from '@utils/calculateAcceptedVariants'
import { getDataFromCode } from '@utils/getDataFromCode'
import { getStepDataAsync } from '@utils/getStepDataAsync'
import activeStepStore, {
  ActiveStepOptions,
} from '../pages/filter/dtree/components/active-step.store'
import datasetStore from './dataset'
import { DtreeStatStore } from './dtree/dtree-stat.store'

export type IStepData = {
  step: number
  groups: any[]
  negate?: boolean
  all?: boolean
  excluded: boolean
  isActive: boolean
  isReturnedVariantsActive: boolean
  startFilterCounts: FilterCountsType
  difference: FilterCountsType
  comment?: string
  condition?: string
  isFinalStep?: boolean
}

interface IRequestData {
  operation: number
  request: {
    setCode: string
    statCode: string
  }
}

class DtreeStore {
  dtreeList: any
  dtree: any
  isCountsReceived = false
  dtreeCode = ''
  startDtreeCode = ''
  localDtreeCode = ''
  currentDtreeName = ''
  previousDtreeName = ''
  createNewDtreeName = ''
  actionName: ActionFilterEnum | undefined = undefined

  statFuncData: any = []
  scenario: any
  request: any
  queryBuilderRenderKey = Date.now()

  readonly stat = new DtreeStatStore()
  statRequestId = ''

  selectedGroups: any = []
  selectedFilters: string[] = []
  dtreeStepIndices: string[] = []

  pointCounts: [number | null][] = []
  acceptedVariants = 0

  evalStatus = undefined
  savingStatus: any = []
  shouldLoadTableModal = false

  isFilterContentExpanded = false
  filterChangeIndicator = 0

  isFilterModalContentExpanded = false
  filterModalChangeIndicator = 0

  isDtreeLoading = false

  isResultsContentExpanded = false
  resultsChangeIndicator = 0

  filterValue = ''
  filterModalValue = ''
  algorithmFilterValue = ''
  filteredCounts = 0

  stepData: IStepData[] = []
  stepAmout = 0

  isModalSaveDatasetVisible = false
  isModalViewVariantsVisible = false
  tableModalIndexNumber: null | number = null

  requestData: IRequestData[] = []

  actionHistory: IDsStatArguments[] = []
  actionHistoryIndex = -1

  constructor() {
    makeAutoObservable(this)
  }

  // 1. Functions to load / draw / edit decision trees

  async drawDecesionTreeAsync(isLoadingNewTree: boolean) {
    const initialStepData: IStepData[] = [
      {
        step: 1,
        groups: [],
        excluded: true,
        isActive: false,
        isReturnedVariantsActive: false,
        startFilterCounts: null,
        difference: null,
      },
    ]

    const computedStepData = await getStepDataAsync(isLoadingNewTree)

    const newStepData =
      computedStepData.length === 0 ? initialStepData : computedStepData

    const stepCodes = getDataFromCode(this.dtreeCode)

    const finalStep: IStepData = {
      step: newStepData.length,
      groups: [],
      excluded: !stepCodes[stepCodes.length - 1]?.result,
      isActive: false,
      isReturnedVariantsActive: false,
      startFilterCounts: null,
      difference: null,
      isFinalStep: true,
    }

    newStepData.push(finalStep)

    runInAction(() => {
      this.stepData = [...newStepData]
      this.dtreeStepIndices = Object.keys(this.dtree['cond-atoms'])
    })

    const stepDataActiveIndex = newStepData.findIndex(
      element => element.isActive || element.isReturnedVariantsActive,
    )

    const nextActiveStep =
      stepDataActiveIndex === -1 ? newStepData.length - 1 : stepDataActiveIndex

    activeStepStore.makeStepActive(
      nextActiveStep,
      ActiveStepOptions.StartedVariants,
    )
  }

  get statAmount(): TFilteringStatCounts | undefined {
    return this.stat.filteredCounts
  }

  getStepIndexForApi = (index: number) => {
    const indexes = toJS(this.dtreeStepIndices)
    const shouldGetAnotherIndex = index === indexes.length

    const currentIndex = shouldGetAnotherIndex
      ? +indexes[index - 1] + 1
      : +indexes[index]

    const stepIndex = indexes.length === 0 ? 0 : currentIndex

    const pointsIndexes = Object.keys(this.dtree?.points)
    const lastIndex = +pointsIndexes[pointsIndexes.length - 1]

    const stepIndexForApi = Number.isNaN(stepIndex) ? lastIndex : stepIndex

    return stepIndexForApi
  }

  // TODO: change body type
  async fetchDtreeSetAsync(body: any, shouldSaveInHistory = true) {
    if (shouldSaveInHistory) addToActionHistory(body)

    this.setIsCountsReceived(false)

    const response = await fetch(getApiUrl('dtree_set'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()
    const newCode = result.code

    runInAction(() => {
      if (
        !this.startDtreeCode ||
        this.currentDtreeName !== this.previousDtreeName
      ) {
        this.startDtreeCode = newCode
        this.setPrevDtreeName(this.currentDtreeName)
      }

      this.dtree = result
      this.dtreeCode = newCode
      this.dtreeList = result['dtree-list']
      this.evalStatus = result['eval-status']
    })

    const isLoadingNewTree = !body.has('code')

    this.drawDecesionTreeAsync(isLoadingNewTree)
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    const body: IStatfuncArguments = {
      ds: datasetStore.datasetName,
      no: activeStepStore.stepIndexForApi,
      code: this.dtreeCode,
      rq_id: Math.random().toString(),
      unit: subGroupName,
      param,
    }

    const result = await filteringRegimeProvider.getStatFunc(body)

    runInAction(() => {
      this.statFuncData = result

      if (result.scenario) this.scenario = result.scenario

      if (result.request) this.request = result.request
    })

    return result
  }

  setActionHistory(updatedActionHistory: IDsStatArguments[]) {
    runInAction(() => {
      this.actionHistory = [...updatedActionHistory]
    })
  }

  setActionHistoryIndex(updatedIndex: number) {
    runInAction(() => {
      this.actionHistoryIndex = updatedIndex
    })
  }

  // 2. UI functions to display adding / deleting / editing steps

  get filteredStepData(): IStepData[] {
    const searchValue = this.algorithmFilterValue.toLowerCase()

    if (!searchValue) return this.stepData

    const filteredStepData = this.stepData.filter(({ groups }) => {
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

    return filteredStepData
  }

  get isTreeEmpty(): boolean {
    const isFirstStepEmpty = this.stepData[0]?.groups.length === 0
    return this.stepData.length === 2 && isFirstStepEmpty
  }

  insertStep(position: CreateEmptyStepPositions, index: number) {
    const localStepData = [...this.stepData]

    localStepData.forEach(element => {
      element.isActive = false

      return element
    })

    const isPositionBefore = position === CreateEmptyStepPositions.BEFORE
    const isFirstStep = index === 0
    const prevStepIndex = isFirstStep ? index : index - 1

    const currentStepIndex = isPositionBefore ? prevStepIndex : index

    const prevStartFilterCounts =
      localStepData?.[currentStepIndex].startFilterCounts
    const prevDifference = localStepData?.[currentStepIndex].difference

    const isStepCalculated =
      typeof prevStartFilterCounts === 'number' &&
      typeof prevDifference === 'number'

    const newStartFilterCounts = isStepCalculated
      ? prevStartFilterCounts - prevDifference
      : prevStartFilterCounts

    const startFilterCounts =
      isFirstStep && isPositionBefore
        ? prevStartFilterCounts
        : newStartFilterCounts

    const startSpliceIndex = isPositionBefore ? index : index + 1

    localStepData.splice(startSpliceIndex, 0, {
      step: index,
      groups: [],
      excluded: true,
      isActive: true,
      isReturnedVariantsActive: false,
      startFilterCounts,
      difference: 0,
    })

    localStepData.forEach((item, currNo: number) => {
      item.step = currNo + 1
    })

    runInAction(() => {
      this.stepData = [...localStepData]
    })

    this.resetLocalDtreeCode()
  }

  duplicateStep(index: number) {
    const clonedStep = cloneDeep(this.stepData[index])

    this.stepData.splice(index + 1, 0, clonedStep)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
    this.resetLocalDtreeCode()
  }

  removeStep(index: number) {
    this.stepData.splice(index, 1)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
    activeStepStore.makeStepActive(
      this.stepData.length - 1,
      ActiveStepOptions.StartedVariants,
    )

    this.resetLocalDtreeCode()
  }

  addSelectedGroup(group: any) {
    this.selectedGroups = []
    this.selectedGroups = group
    this.resetLocalDtreeCode()
  }

  addSelectedFilter(filter: string) {
    this.selectedFilters = [...this.selectedFilters, filter]

    this.resetLocalDtreeCode()
  }

  addSelectedFilterList(filters: string[]) {
    this.selectedFilters = [...this.selectedFilters, ...filters]

    this.resetLocalDtreeCode()
  }

  removeSelectedFilter(filter: string) {
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter)
    this.resetLocalDtreeCode()
  }

  resetSelectedFilters() {
    this.selectedFilters = []
  }

  // 3.2 Functions for editing loaded tree

  setNextDtreeCode(code: string) {
    this.dtreeCode = code
  }

  setStartDtreeCode() {
    this.startDtreeCode = this.dtreeCode
  }

  setLocalDtreeCode(code: string) {
    this.localDtreeCode = code
  }

  resetLocalDtreeCode() {
    this.localDtreeCode = ''
  }

  // 3.4 Common UI/UX modals

  openModalSaveDataset() {
    this.isModalSaveDatasetVisible = true
  }

  closeModalSaveDataset() {
    this.isModalSaveDatasetVisible = false
  }

  openModalViewVariants(index?: number) {
    this.isModalViewVariantsVisible = true

    if (index) this.tableModalIndexNumber = index
  }

  closeModalViewVariants = () => {
    this.isModalViewVariantsVisible = false
    this.tableModalIndexNumber = null
  }

  // 4. Other UI control functions

  setJobStatus(jobStatus: any) {
    runInAction(() => {
      this.savingStatus = JSON.parse(JSON.stringify(jobStatus))
    })
  }

  clearJobStatus() {
    runInAction(() => {
      this.savingStatus = []
    })
  }

  setShouldLoadTableModal(shouldLoad: boolean) {
    runInAction(() => {
      this.shouldLoadTableModal = shouldLoad
    })
  }

  setQueryBuilderRenderKey(key: number) {
    runInAction(() => {
      this.queryBuilderRenderKey = key
    })
  }

  setPointCounts(pointCounts: [number | null][] | number[][]) {
    runInAction(() => {
      this.pointCounts = JSON.parse(JSON.stringify(pointCounts))
    })
  }

  updatePointCounts(pointCounts: [number | null][]) {
    const localStepData = [...this.stepData]

    const counts = toJS(pointCounts)

    localStepData.forEach((element, index) => {
      const startCountsIndex = this.getStepIndexForApi(index)
      const differenceCountsIndex = startCountsIndex + 1

      const isFinalStep = index === localStepData.length - 1

      if (isFinalStep) {
        element.difference = counts[counts.length - 1]?.[0]
      } else {
        element.startFilterCounts = counts[startCountsIndex]?.[0]
        element.difference = counts[differenceCountsIndex]?.[0]
      }
    })

    runInAction(() => {
      this.stepData = [...localStepData]
    })
  }

  setAcceptedVariants() {
    const calculatedAcceptedVariants = calculateAcceptedVariants(this.stepData)

    runInAction(() => {
      this.acceptedVariants = calculatedAcceptedVariants
    })
  }

  expandFilterContent() {
    this.isFilterContentExpanded = true
    this.filterChangeIndicator++
  }

  collapseFilterContent() {
    this.isFilterContentExpanded = false
    this.filterChangeIndicator--
  }

  expandFilterModalContent() {
    this.isFilterModalContentExpanded = true
    this.filterModalChangeIndicator++
  }

  collapseFilterModalContent() {
    this.isFilterModalContentExpanded = false
    this.filterModalChangeIndicator--
  }

  expandResultsContent() {
    this.isResultsContentExpanded = true
    this.resultsChangeIndicator++
  }

  collapseResultsContent() {
    this.isResultsContentExpanded = false
    this.resultsChangeIndicator--
  }

  setFilterValue(item: string) {
    this.filterValue = item
  }

  resetFilterValue() {
    this.filterValue = ''
  }

  setFilterModalValue(item: string) {
    this.filterModalValue = item
  }

  resetFilterModalValue() {
    this.filterModalValue = ''
  }

  setAlgorithmFilterValue(item: string) {
    this.algorithmFilterValue = item
  }

  resetAlgorithmFilterValue() {
    this.algorithmFilterValue = ''
  }

  toggleIsExcluded(index: number) {
    this.stepData[index].excluded = !this.stepData[index].excluded
    this.resetLocalDtreeCode()
  }

  changeStepDataActiveStep = (
    index: number,
    option: ActiveStepOptions,
    indexForApi: string,
  ) => {
    this.stepData.forEach(element => {
      element.isActive = false
      element.isReturnedVariantsActive = false
    })

    if (option === ActiveStepOptions.StartedVariants) {
      this.stepData[index].isActive = true
    } else {
      this.stepData[index].isReturnedVariantsActive = true
    }

    this.stat.setQuery({
      datasetName: datasetStore.datasetName,
      code: this.dtreeCode,
      stepIndex: indexForApi,
    })
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  resetData() {
    this.filteredCounts = 0
    this.statRequestId = ''
  }

  setCurrentDtreeName(name: string) {
    if (this.currentDtreeName) {
      this.setPrevDtreeName(this.currentDtreeName)
    }

    this.currentDtreeName = name
  }

  resetCurrentDtreeName() {
    this.currentDtreeName = ''
  }

  setCreateNewDtreeName(dtreeName: string) {
    this.createNewDtreeName = dtreeName
  }

  resetCreateNewDtreeName() {
    this.createNewDtreeName = ''
  }

  setPrevDtreeName(name: string) {
    this.previousDtreeName = name
  }

  resetPrevDtreeName() {
    this.previousDtreeName = ''
  }

  setStatRequestId(id: string) {
    this.statRequestId = id
  }

  clearStatRequestId() {
    runInAction(() => {
      this.statRequestId = ''
    })
  }

  setIsCountsReceived(isReceived: boolean) {
    runInAction(() => {
      this.isCountsReceived = isReceived
    })
  }

  setActionName(actionName?: ActionFilterEnum): void {
    this.actionName = actionName
  }
}

export default new DtreeStore()
