/* eslint-disable max-lines */
import { cloneDeep } from 'lodash'
import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'

import { DtreeStatType, FilterCountsType, StatList } from '@declarations'
import { getApiUrl } from '@core/get-api-url'
import { calculateAcceptedVariants } from '@utils/calculateAcceptedVariants'
import { getStepDataAsync } from '@utils/getStepDataAsync'
import datasetStore from './dataset'

export type IStepData = {
  step?: number
  groups?: any
  negate?: boolean
  excluded: boolean
  isActive?: boolean
  startFilterCounts: FilterCountsType
  finishFilterCounts: FilterCountsType
  difference: FilterCountsType
  comment?: string
  condition?: string
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
  dtreeCode = ''

  statFuncData: any = []
  scenario: any
  request: any

  dtreeStat: DtreeStatType = {}
  statAmount: number[] = []

  selectedGroups: any = []
  selectedFilters: string[] = []
  dtreeStepIndices: string[] = []

  pointCounts: [number | null][] = []
  acceptedVariants = 0

  savingStatus: any = []
  shouldLoadTableModal = false

  isFilterContentExpanded = false
  filterChangeIndicator = 0
  isFiltersLoading = false
  isDtreeLoading = false

  isResultsContentExpanded = false
  resultsChangeIndicator = 0

  searchFieldFilterList = ''
  searchFieldResults = ''
  filteredCounts = 0

  stepData: IStepData[] = [
    {
      step: 1,
      excluded: true,
      isActive: true,
      startFilterCounts: 0,
      finishFilterCounts: 0,
      difference: 0,
    },
  ]
  stepAmout = 0

  isModalAttributeVisible = false
  isModalSelectFilterVisible = false
  isModalEditFiltersVisible = false
  isModalJoinVisible = false
  isModalEditNumbersVisible = false
  isModalSelectNumbersVisible = false

  isModalEditInheritanceModeVisible = false
  isModalEditCustomInheritanceModeVisible = false
  isModalEditCompoundHetVisible = false
  isModalEditCompoundRequestVisible = false
  isModalEditGeneRegionVisible = false

  isTableModalVisible = false
  tableModalIndexNumber: null | number = null

  groupNameToChange = ''
  groupIndexToChange = 0

  currentStepIndex = 0
  currentStepIndexForApi = 0

  requestData: IRequestData[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // functions to load / draw / edit decision trees

  async fetchDtreeListAsync() {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      code: 'return False',
    })

    const response = await fetch(getApiUrl(`dtree_set`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.dtreeList = result['dtree-list']
    })
  }

  async fetchDtreeAsync(name: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      dtree: name,
    })

    const response = await fetch(getApiUrl(`dtree_set`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.dtree = result
      this.dtreeCode = result['code']
    })

    this.drawDecesionTreeAsync()
  }

  async drawDecesionTreeAsync() {
    const localStepData = await getStepDataAsync()

    runInAction(() => {
      this.stepData = [...localStepData]
      this.dtreeStepIndices = Object.keys(this.dtree['cond-atoms'])
    })

    const lastIndex = +this.dtreeStepIndices[this.dtreeStepIndices.length - 1]
    const finalStepCount = 2
    const indexForApi = lastIndex + finalStepCount

    this.fetchDtreeStatAsync(this.dtreeCode, String(indexForApi))
  }

  async fetchDtreeStatAsync(code = 'return False', no = '0') {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      no,
      code,
    })

    const response = await fetch(getApiUrl(`dtree_stat`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.dtreeStat = result
      this.statAmount = get(result, 'filtered-counts', [])
      this.filteredCounts = this.statAmount[1]
    })
    this.resetIsFiltersLoading()
  }

  get getQueryBuilder() {
    const groups: Record<string, StatList[]> = {}

    this.dtreeStat['stat-list'] &&
      this.dtreeStat['stat-list'].forEach((item: StatList) => {
        if (
          (item.title || item.name) &&
          (item.title || item.name)
            .toLocaleLowerCase()
            .includes(this.searchFieldFilterList.toLocaleLowerCase())
        ) {
          if (groups[item.vgroup]) {
            groups[item.vgroup] = [...groups[item.vgroup], item]
          } else {
            groups[item.vgroup] = [item]
          }
        }
      })

    return groups
  }

  getLastStepIndexForApi = () => {
    const lastIndexValue = Number(
      this.dtreeStepIndices[this.currentStepIndex - 1],
    )

    const currentIndex = lastIndexValue + 2

    return currentIndex
  }

  getStepIndexForApi = (index: number) => {
    const currentIndex = Number(this.dtreeStepIndices[index])

    return currentIndex
  }
  setCurrentStepIndexForApi = (index: number) => {
    runInAction(() => {
      this.currentStepIndexForApi = index
    })
  }

  async fetchDtreeSetAsync(body: URLSearchParams) {
    this.setIsFiltersLoading()

    const response = await fetch(getApiUrl(`dtree_set`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    const newCode = result.code

    runInAction(() => {
      this.dtree = result
      this.dtreeCode = newCode
    })

    this.drawDecesionTreeAsync()
  }

  async fetchStatFuncAsync(subGroupName: string, param: string) {
    this.setIsFiltersLoading()

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      no: this.currentStepIndexForApi.toString(),
      code: this.dtreeCode,
      rq_id: Math.random().toString(),
      unit: subGroupName,
      param,
    })

    const response = await fetch(getApiUrl(`statfunc`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      this.statFuncData = result

      if (result.scenario) this.scenario = result.scenario

      if (result.request) this.request = result.request
    })
  }

  // UI functions to display adding / deleting / editing steps

  addStep(index: number) {
    if (this.stepData.length === 0) {
      this.stepData = [
        {
          step: 1,
          excluded: true,
          isActive: true,
          startFilterCounts: 0,
          finishFilterCounts: 0,
          difference: 0,
        },
      ]
    } else {
      this.currentStepIndex = index + 1

      const startFilterCounts = this.stepData[index].finishFilterCounts

      this.stepData = [
        ...this.stepData,
        {
          step: this.stepData.length + 1,
          excluded: true,
          isActive: true,
          startFilterCounts,
          finishFilterCounts: startFilterCounts,
          difference: 0,
        },
      ]
    }
  }

  duplicateStep(index: number) {
    const clonedStep = cloneDeep(this.stepData[index])

    this.stepData.splice(index + 1, 0, clonedStep)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
  }

  removeStep(index: number) {
    this.stepData.splice(index, 1)

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
  }

  negateStep(index: number) {
    if (!this.stepData[index].negate) {
      this.stepData[index].negate = true
    } else {
      this.stepData[index].negate = !this.stepData[index].negate
    }
  }

  addSelectedGroup(group: any) {
    this.selectedGroups = []
    this.selectedGroups = group
  }

  addSelectedFilter(filter: string) {
    this.selectedFilters = [...this.selectedFilters, filter]
  }

  removeSelectedFilter(filter: string) {
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter)
  }

  addStepData(subGroupName: string, typeOfAttr: string, numericData?: any[]) {
    const currentStep = this.stepData[this.currentStepIndex]

    if (!currentStep.groups || currentStep.groups.length === 0) {
      currentStep.groups = [[typeOfAttr, this.selectedGroups[1]]]
    } else if (!currentStep.groups.join().includes(this.selectedGroups[1])) {
      currentStep.groups = [...currentStep.groups, this.selectedGroups]
    }

    currentStep.groups.map((item: string, index: number) => {
      if (item[1] === subGroupName) {
        numericData
          ? (currentStep.groups[index][
              currentStep.groups[index].length
            ] = numericData)
          : (currentStep.groups[index][
              currentStep.groups[index].length
            ] = this.selectedFilters)
      }
    })

    this.selectedFilters = []
  }

  joinStepData(typeOfJoin: string, typeOfAttr: string, numericData?: any[]) {
    const currentStep = this.stepData[this.currentStepIndex]

    numericData
      ? (currentStep.groups = [
          ...currentStep.groups,
          [typeOfAttr, this.selectedGroups[1], typeOfJoin, numericData],
        ])
      : (currentStep.groups = [
          ...currentStep.groups,
          [
            typeOfAttr,
            this.selectedGroups[1],
            typeOfJoin,
            this.selectedFilters,
          ],
        ])

    this.selectedFilters = []
  }

  removeStepData(indexOfCurrentGroup: number) {
    this.stepData[this.currentStepIndex].groups.splice(indexOfCurrentGroup, 1)

    // DONT DELETE
    // if (this.stepData[0].groups[0] && this.stepData[0].groups[0][3]) {
    //   this.stepData[0].groups[0].pop()
    // }
  }

  updateStepData(indexOfCurrentGroup: number, params?: any) {
    this.stepData[this.currentStepIndex].groups[indexOfCurrentGroup].forEach(
      (elem: any, index: number) => {
        if (Array.isArray(elem) && this.selectedFilters.length > 0) {
          this.stepData[this.currentStepIndex].groups[indexOfCurrentGroup][
            index
          ] = this.selectedFilters
        }

        if (typeof elem === 'object' && !Array.isArray(elem)) {
          this.stepData[this.currentStepIndex].groups[indexOfCurrentGroup][
            index
          ] = params
        }
      },
    )
  }

  updateNumericStepData(indexOfCurrentGroup: number, numericData: any[]) {
    const currentGroupLength = this.stepData[this.currentStepIndex].groups[
      indexOfCurrentGroup
    ].length

    this.stepData[this.currentStepIndex].groups[indexOfCurrentGroup][
      currentGroupLength - 1
    ] = numericData
  }

  replaceStepData(
    subGroupName: string,
    typeOfAttr: string,
    numericData?: any[],
  ) {
    this.stepData[this.currentStepIndex].groups = []
    this.addStepData(subGroupName, typeOfAttr, numericData)
  }

  resetSelectedFilters() {
    this.selectedFilters = []
  }

  // modals control block

  openModalAttribute(index: number) {
    this.isModalAttributeVisible = true

    this.currentStepIndex = index
  }

  closeModalAttribute() {
    this.isModalAttributeVisible = false
  }

  openModalSelectFilter(groupName: string) {
    this.isModalSelectFilterVisible = true
    this.groupNameToChange = groupName
  }

  closeModalSelectFilter() {
    this.isModalSelectFilterVisible = false
  }

  openModalEditFilters(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditFiltersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditFilters() {
    this.isModalEditFiltersVisible = false
    this.selectedFilters = []
  }

  openModalJoin() {
    this.isModalJoinVisible = true
  }

  closeModalJoin() {
    this.isModalJoinVisible = false
  }

  openModalEditNumbers(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditNumbersVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditNumbers() {
    this.isModalEditNumbersVisible = false
  }

  openModalSelectNumbers(groupName: string) {
    this.isModalSelectNumbersVisible = true
    this.groupNameToChange = groupName
  }

  closeModalSelectNumbers() {
    this.isModalSelectNumbersVisible = false
  }

  openModalEditInheritanceMode(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditInheritanceMode() {
    this.isModalEditInheritanceModeVisible = false
  }

  openModalEditCustomInheritanceMode(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCustomInheritanceModeVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditCustomInheritanceMode() {
    this.isModalEditCustomInheritanceModeVisible = false
  }

  openModalEditCompoundHet(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundHetVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditCompoundHet() {
    this.isModalEditCompoundHetVisible = false
  }
  insertStep(type: string, index: number) {
    this.stepData.forEach(element => {
      element.isActive = false

      return element
    })

    if (type === 'BEFORE') {
      this.stepData.splice(index, 0, {
        step: index,
        excluded: true,
        isActive: true,
        startFilterCounts: 0,
        finishFilterCounts: 0,
        difference: 0,
      })
    } else {
      this.stepData.splice(index + 1, 0, {
        step: index,
        excluded: true,
        isActive: true,
        startFilterCounts: 0,
        finishFilterCounts: 0,
        difference: 0,
      })
    }

    this.stepData.map((item, currNo: number) => {
      item.step = currNo + 1
    })
  }

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

  setPointCounts(pointCounts: [number | null][] | number[][]) {
    runInAction(() => {
      this.pointCounts = JSON.parse(JSON.stringify(pointCounts))
    })
  }

  updatePointCounts(pointCounts: [number | null][]) {
    const localStepData = [...this.stepData]

    localStepData.forEach((element, index) => {
      const startCountsIndex = this.getStepIndexForApi(index)

      const startCounts =
        pointCounts[startCountsIndex] === null
          ? '...'
          : pointCounts[startCountsIndex]?.[0]

      const diferenceCountsIndex = this.getStepIndexForApi(index) + 1

      const diferenceCounts =
        pointCounts[diferenceCountsIndex] === null
          ? '...'
          : pointCounts[diferenceCountsIndex]?.[0]

      const finishCountsIndex = this.getStepIndexForApi(index) + 2

      const finishCounts =
        pointCounts[finishCountsIndex] === null
          ? '...'
          : pointCounts[finishCountsIndex]?.[0]

      element.startFilterCounts = startCounts
      element.difference = diferenceCounts
      element.finishFilterCounts = finishCounts
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

  openModalEditCompoundRequest(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  openModalEditCustomInheritanceModeFunc(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditCompoundRequestVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditCompoundRequest() {
    this.isModalEditCompoundRequestVisible = false
  }

  openModalEditGeneRegion(
    groupName: string,
    stepIndex: number,
    groupIndex: number,
  ) {
    this.isModalEditGeneRegionVisible = true
    this.groupNameToChange = groupName
    this.groupIndexToChange = groupIndex

    this.currentStepIndex = stepIndex
  }

  closeModalEditGeneRegion() {
    this.isModalEditGeneRegionVisible = false
  }

  // other UI control functions

  expandFilterContent() {
    this.isFilterContentExpanded = true
    this.filterChangeIndicator++
  }

  collapseFilterContent() {
    this.isFilterContentExpanded = false
    this.filterChangeIndicator--
  }

  resetFilterChangeIndicator() {
    this.filterChangeIndicator = 0
  }

  expandResultsContent() {
    this.isResultsContentExpanded = true
    this.resultsChangeIndicator++
  }

  collapseResultsContent() {
    this.isResultsContentExpanded = false
    this.resultsChangeIndicator--
  }

  resetResultsChangeIndicator() {
    this.resultsChangeIndicator = 0
  }

  addSearchFieldFilterList(item: string) {
    this.searchFieldFilterList = item
  }

  addSearchFieldResults(item: string) {
    this.searchFieldResults = item
  }

  setIsFiltersLoading() {
    this.isFiltersLoading = true
  }

  resetIsFiltersLoading() {
    this.isFiltersLoading = false
  }

  toggleIsExcluded(index: number) {
    this.stepData[index].excluded = !this.stepData[index].excluded
  }

  setStepActive = (index: number) => {
    this.stepData.forEach(element => {
      element.isActive = false
    })

    this.stepData[index].isActive = !this.stepData[index].isActive
  }
  openTableModal(index: number) {
    this.isTableModalVisible = true
    this.tableModalIndexNumber = index
  }
  closeTableModal() {
    this.isTableModalVisible = false
    this.tableModalIndexNumber = null
  }
}

export default new DtreeStore()
