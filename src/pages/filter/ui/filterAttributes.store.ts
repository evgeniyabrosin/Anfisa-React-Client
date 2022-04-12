import difference from 'lodash/difference'
import { makeAutoObservable, toJS } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { TEnumCondition } from '@service-providers/common/common.interface'
import { getConditionJoinMode } from '@utils/getConditionJoinMode'

type FilterGroup = {
  vgroup: string
  groupName: string
}

/**
 * TODO: I think it would be better to update the state of filters
 *       based on the setConditionsAsync response,
 *       than use separately updated filter state in filterStore
 */

export class FilterAttributesStore {
  currentMode?: ModeTypes

  constructor() {
    makeAutoObservable(this)
  }

  public setCurrentMode(modeType?: ModeTypes): void {
    if (!modeType) {
      this.currentMode = undefined
    }

    if (this.currentMode === modeType) {
      this.resetCurrentMode()

      return
    }

    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public get currentGroup(): FilterGroup {
    return {
      vgroup: filterStore.selectedGroupItem.vgroup,
      groupName: filterStore.selectedGroupItem.name,
    }
  }

  get allEnumVariants(): [string, number][] {
    return toJS(this.getAllEnumVariants(this.currentGroup))
  }

  public get groupSubKind(): string {
    return filterStore.selectedGroupItem['sub-kind']
  }

  public updateEnumFilter(group: FilterGroup, values: string[]): void {
    const { groupName } = group

    const condition: TEnumCondition = [
      FilterKindEnum.Enum,
      groupName,
      getConditionJoinMode(this.currentMode),
      values,
    ]

    filterStore.isRedactorMode
      ? filterStore.addFilterToFilterBlock(condition)
      : filterStore.addFilterBlock(condition)

    if (datasetStore.activePreset) {
      datasetStore.resetActivePreset()
    }

    this.resetCurrentMode()
  }

  public addValuesToCurrentGroupEnumFilter(values: string[]): void {
    this.updateEnumFilter(this.currentGroup, values)
  }

  private getAllEnumVariants(group: FilterGroup): [string, number][] {
    const { groupName } = group

    const { selectedFilter } = filterStore

    const allSelectedFilters: [string, number][] =
      datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === groupName,
      )?.variants ?? []

    const filteredSelectedFilters = allSelectedFilters.filter(
      ([, filterValue]) => filterValue > 0,
    )

    if (selectedFilter) {
      // There are some cases when preset contains third party filters with 0 variants
      // Thats why we have to insert them in order to show

      const selectedFiltersNames = selectedFilter[3]

      const allSelectedFiltersNames = allSelectedFilters.map(item => item[0])

      const thirdPartyFilters = difference(
        selectedFiltersNames,
        allSelectedFiltersNames,
      )

      thirdPartyFilters.forEach(filterName =>
        allSelectedFilters.push([filterName, 0]),
      )

      return allSelectedFilters
    }

    return filteredSelectedFilters
  }
}

export default new FilterAttributesStore()
