/* eslint-disable max-lines */

import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import { ActionsHistoryStore } from '@store/actions-history'
import filterDtreesStore from '@store/filter-dtrees'
import { TFilteringStatCounts } from '@service-providers/common'
import {
  DtreeSetPointKinds,
  IDtreeSetArguments,
} from '@service-providers/decision-trees'
import { IStatFuncArguments } from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { showToast } from '@utils/notifications'
import datasetStore from '../dataset/dataset'
import { DtreeModifiedState } from '../filter-dtrees/filter-dtrees.store'
import { DtreeCountsAsyncStore } from './dtree-counts.async.store'
import { DtreeSetAsyncStore } from './dtree-set.async.store'
import { DtreeStatStore } from './dtree-stat.store'
import stepStore, { ActiveStepOptions } from './step.store'

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

export class DtreeStore {
  get dtreeList() {
    return this.dtreeSetData?.['dtree-list']
  }
  get dtreeSetData() {
    return this.dtreeSet.data
  }

  get dtreeCode(): string {
    return this.dtreeSetData?.code ?? ''
  }
  startDtreeCode = ''
  localDtreeCode = ''
  // TODO: get dtree name from this.dtreeSetData
  currentDtreeName = ''
  previousDtreeName = ''
  private _dtreeModifiedState: DtreeModifiedState = DtreeModifiedState.NotDtree
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
  algorithmFilterFullWord = false
  filteredCounts = 0

  isModalSaveDatasetVisible = false
  isModalViewVariantsVisible = false
  tableModalIndexNumber: null | number = null

  requestData: IRequestData[] = []

  actionHistory = new ActionsHistoryStore<IDtreeSetArguments>(data =>
    this.fetchDtreeSetAsync(data, false),
  )

  readonly dtreeSet = new DtreeSetAsyncStore()
  readonly dtreeCounts = new DtreeCountsAsyncStore()

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
          stepStore.setSteps(response.steps)

          // make step active after load dtree_set
          const { activeStepIndex, steps } = stepStore
          const finalStepIndex = steps.length - 1

          // use finalStepIndex if
          // 1) load new tree
          // 2) first load empty tree
          // 3) the final step is active and we deleted different step
          const shouldUseFinalIndex =
            response['dtree-name'] ||
            activeStepIndex === 0 ||
            activeStepIndex > finalStepIndex

          const index = shouldUseFinalIndex ? finalStepIndex : activeStepIndex

          stepStore.makeStepActive(index, ActiveStepOptions.StartedVariants)
        }
        if (response?.kind === 'xl') {
          this.dtreeCounts.setQuery({
            ds: datasetStore.datasetName,
            tm: '1',
            code: response.code,
            points: [...new Array(response['point-counts'].length).keys()],
            rq_id: response['rq-id'],
          })
        }
      },
    )

    makeAutoObservable(this)

    reaction(
      () => filterDtreesStore.activeDtree,
      dtreeName => {
        if (dtreeName) {
          this.loadDtree(dtreeName)
        } else {
          this.resetPreset()
        }
      },
    )
  }

  get statAmount(): TFilteringStatCounts | undefined {
    return this.stat.filteredCounts
  }

  get isXl(): boolean {
    return !this.dtreeSetData || this.dtreeSetData.kind === 'xl'
  }

  get acceptedVariants(): number {
    return stepStore.steps.reduce((acc, { excluded, returnPointIndex }) => {
      if (!excluded && returnPointIndex !== null) {
        return acc + (this.pointCounts[returnPointIndex]?.[0] ?? 0)
      }

      return acc
    }, 0)
  }

  /**
   * totalFilteredCounts returns accepted and rejected variants for XL dataset,
   * and transcribed variants for WS
   */
  get totalFilteredCounts(): IDtreeFilteredCounts | undefined {
    if (!this.dtreeSetData) {
      return undefined
    }
    const isXl = this.isXl
    const { points } = this.dtreeSetData
    const totalCounts = this.dtreeSetData['total-counts']
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

    const rejected = Number(totalCounts[isXl ? 0 : 1]) - accepted

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

    const pointsIndexes = Object.keys(this.dtreeSetData?.points ?? [])
    const lastIndex = +pointsIndexes[pointsIndexes.length - 1]

    const stepIndexForApi = Number.isNaN(stepIndex) ? lastIndex : stepIndex

    return stepIndexForApi
  }

  async fetchDtreeSetAsync(
    body: IDtreeSetArguments,
    shouldSaveInHistory = true,
  ) {
    if (shouldSaveInHistory) this.actionHistory.addHistory(body)

    this.dtreeSet.setQuery(body)
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    const body: IStatFuncArguments = {
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

  private loadDtree(dtreeName: string): void {
    this.isDtreeLoading = true

    this.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      dtree: dtreeName,
    })
      .then(() => {
        this.setDtreeModifiedState(DtreeModifiedState.NotModified)
      })
      .catch(() => {
        showToast(t('dtree.errors.loadDtree', { dtreeName }), 'error')
      })
      .finally(() => {
        runInAction(() => {
          this.isDtreeLoading = false
        })
      })
  }

  private setDtreeModifiedState(state?: DtreeModifiedState): void {
    if (state === undefined) {
      if (this._dtreeModifiedState === DtreeModifiedState.NotModified) {
        this._dtreeModifiedState = DtreeModifiedState.Modified
        filterDtreesStore.resetActiveDtree()
      }
    } else if (state !== this._dtreeModifiedState) {
      this._dtreeModifiedState = state
    }
  }

  private resetPreset(): void {
    if (this._dtreeModifiedState !== DtreeModifiedState.Modified) {
      // TODO[control]: will be implemented with the new async store for dtree_set
    }

    this.setDtreeModifiedState(DtreeModifiedState.NotDtree)
  }

  // 2. UI functions to display adding / deleting / editing steps

  get isTreeEmpty(): boolean {
    const isFirstStepEmpty = stepStore.steps[0]?.groups.length === 0
    return stepStore.steps.length === 2 && isFirstStepEmpty
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

  openModalSaveDataset = () => {
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

  setAlgorithmFilterFullWord = (value: boolean) => {
    this.algorithmFilterFullWord = value
  }

  resetAlgorithmFilterValue() {
    this.algorithmFilterValue = ''
  }

  toggleIsExcluded(index: number) {
    stepStore.steps[index].excluded = !stepStore.steps[index].excluded
    this.resetLocalDtreeCode()
  }

  resetStatFuncData() {
    this.statFuncData = []
  }

  resetData() {
    this.filteredCounts = 0
    this.statRequestId = ''
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

  setActionName(actionName?: ActionFilterEnum): void {
    this.actionName = actionName
  }
}
