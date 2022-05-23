/* eslint-disable max-lines */

import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { TFilteringStatCounts, TItemsCount } from '@service-providers/common'
import {
  DtreeSetPointKinds,
  IDtreeSetPoint,
} from '@service-providers/decision-trees'
import { adaptDtreeSetToSteps } from '@service-providers/decision-trees/decision-trees.adapters'
import { IStatfuncArguments } from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { addToActionHistory } from '@utils/addToActionHistory'
import { IDtreeSetArguments } from './../service-providers/decision-trees/decision-trees.interface'
import datasetStore from './dataset/dataset'
import { DtreeCountsAsyncStore } from './dtree/dtree-counts.async.store'
import { DtreeSetAsyncStore } from './dtree/dtree-set.async.store'
import { DtreeStatStore } from './dtree/dtree-stat.store'
import stepStore from './dtree/step.store'

export type IStepData = {
  step: number
  groups: any[]
  negate?: boolean
  all?: boolean
  excluded: boolean
  isActive: boolean
  isReturnedVariantsActive: boolean
  conditionPointIndex: number | null
  returnPointIndex: number | null
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

interface IDtreeFilteredCounts {
  accepted: number
  rejected: number
}

class DtreeStore {
  get dtreeList() {
    return this.dtreeSetData?.['dtree-list']
  }
  get dtreeSetData() {
    return this.dtreeSet.data
  }

  dtree: any
  isCountsReceived = false
  get dtreeCode(): string {
    return this.dtreeSetData?.code ?? ''
  }
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

  get dtreeStepIndices(): string[] {
    return Object.keys(this.dtreeSetData?.['cond-atoms'] ?? {})
  }

  get evalStatus(): string {
    return this.dtreeSetData?.['eval-status'] ?? ''
  }
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

  actionHistory: IDtreeSetArguments[] = []
  actionHistoryIndex = -1

  readonly dtreeSet = new DtreeSetAsyncStore()
  readonly dtreeCounts = new DtreeCountsAsyncStore()

  get dtreeCountsRqId(): string {
    return this.dtreeCounts.data?.['rq-id'] ?? ''
  }

  get pointCounts() {
    const counts = this.isXl
      ? this.dtreeCounts.data?.['point-counts']
      : this.dtreeSetData?.['point-counts']

    return counts ?? []
  }

  constructor() {
    reaction(
      () => this.dtreeSetData,
      response => {
        if (response) {
          stepStore.setSteps(adaptDtreeSetToSteps(response))
        }
      },
    )

    makeAutoObservable(this)
  }

  get statAmount(): TFilteringStatCounts | undefined {
    return this.stat.filteredCounts
  }

  get isXl(): boolean {
    return !this.dtreeSetData || this.dtreeSetData.kind === 'xl'
  }

  get acceptedVariants(): number {
    const counts = this.pointCounts

    return this.stepData.reduce((acc, { excluded, returnPointIndex }) => {
      if (!excluded && returnPointIndex !== null) {
        return acc + (counts[returnPointIndex]?.[0] ?? 0)
      }

      return acc
    }, 0)
  }

  /**
   * totalFilteredCounts returns accepted and rejected variants for XL dataset,
   * and transcribed variants for WS
   */
  get totalFilteredCounts(): IDtreeFilteredCounts | undefined {
    if (!this.dtree || !this.isCountsReceived) {
      return undefined
    }
    const isXl = this.isXl
    const points: IDtreeSetPoint[] = this.dtree.points
    const totalCounts: TItemsCount = this.dtree['total-counts']
    const counts = this.pointCounts

    let accepted = 0

    for (let i = 0; i < points.length; ++i) {
      const { kind, decision } = points[i]

      if (kind === DtreeSetPointKinds.RETURN && decision === true) {
        const count = counts[i]

        if (!count) {
          return undefined
        }
        accepted += count[isXl ? 0 : 1] ?? 0
      }
    }

    const rejected = (totalCounts[isXl ? 0 : 1] as number) - accepted

    return {
      accepted,
      rejected,
    }
  }

  // 1. Functions to load / draw / edit decision trees

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

  async fetchDtreeSetAsync(
    body: IDtreeSetArguments,
    shouldSaveInHistory = true,
  ) {
    if (shouldSaveInHistory) addToActionHistory(body)

    this.setIsCountsReceived(false)

    this.dtreeSet.setQuery(body)

    // const result = await decisionTreesProvider.getDtreeSet(body)

    // const newCode = result.code

    // runInAction(() => {
    //   if (
    //     !this.startDtreeCode ||
    //     this.currentDtreeName !== this.previousDtreeName
    //   ) {
    //     this.startDtreeCode = newCode
    //     this.setPrevDtreeName(this.currentDtreeName)
    //   }

    //   this.dtree = result
    //   this.dtreeCode = newCode
    //   this.dtreeList = result['dtree-list']
    //   this.evalStatus = result['eval-status']
    // })

    // const isLoadingNewTree = !body.code

    // this.drawDecesionTreeAsync(isLoadingNewTree)
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    const body: IStatfuncArguments = {
      ds: datasetStore.datasetName,
      no: stepStore.stepIndexForApi,
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

  setActionHistory(updatedActionHistory: IDtreeSetArguments[]) {
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

  // TODO: move to stepStore
  get filteredStepData(): IStepData[] {
    const searchValue = this.algorithmFilterValue.toLowerCase()

    if (!searchValue) return stepStore.steps

    const filteredStepData = stepStore.steps.filter(({ groups }) => {
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
    // this.dtreeCode = code
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

  // setPointCounts(pointCounts: PointCount[]) {
  //   runInAction(() => {
  //     this.pointCounts = pointCounts
  //   })
  // }

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
