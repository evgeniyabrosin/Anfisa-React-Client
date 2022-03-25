import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, toJS } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore, { DatasetStore } from '@store/dataset'
import filterStore, { FilterStore } from '@store/filter'
import { getModeType } from '@utils/getModeType'

type FilterAttributesStoreParams = {
  datasetStore: DatasetStore
  filterStore: FilterStore
}

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
  private datasetStore: DatasetStore
  private filterStore: FilterStore

  currentMode?: ModeTypes

  constructor(params: FilterAttributesStoreParams) {
    const { datasetStore, filterStore } = params

    this.datasetStore = datasetStore
    this.filterStore = filterStore

    makeAutoObservable(this)
  }

  public get currentGroup(): FilterGroup {
    return {
      vgroup: this.filterStore.selectedGroupItem.vgroup,
      groupName: this.filterStore.selectedGroupItem.name,
    }
  }

  public get groupSubKind(): string {
    return this.filterStore.selectedGroupItem['sub-kind']
  }

  public get allEnumVariants(): [string, number][] {
    return toJS(this.getAllEnumVariants(this.currentGroup))
  }

  public get datasetEnumValues(): string[] {
    return toJS(this.getDatasetEnumValues(this.currentGroup))
  }

  public setCurrentMode(modeType: ModeTypes): void {
    this.currentMode = modeType
  }

  public resetCurrentMode(): void {
    this.currentMode = undefined
  }

  public clearGroupFilter({ vgroup, groupName }: FilterGroup): void {
    const localSelectedFilters = cloneDeep(this.filterStore.selectedFilters)

    if (localSelectedFilters[vgroup]?.[groupName]) {
      delete localSelectedFilters[vgroup][groupName]

      if (this.datasetStore.activePreset) {
        this.datasetStore.resetActivePreset()
      }
    }

    this.filterStore.setSelectedFilters(localSelectedFilters)

    this.datasetStore.removeConditionGroup({ subGroup: groupName })

    if (!this.datasetStore.isXL) {
      this.datasetStore.fetchWsListAsync()
    }
  }

  public clearCurrentGroupFilter(): void {
    this.clearGroupFilter(this.currentGroup)
  }

  public updateEnumFilter(group: FilterGroup, values: string[]): void {
    const { vgroup, groupName } = group

    if (this.datasetStore.activePreset) {
      this.datasetStore.resetActivePreset()
    }

    this.datasetStore.setConditionsAsync([
      [FilterKindEnum.Enum, groupName, getModeType(this.currentMode), values],
    ])

    if (!this.datasetStore.isXL) {
      this.datasetStore.fetchWsListAsync()
    }

    const updatedFilters = cloneDeep(this.filterStore.selectedFilters)

    if (!updatedFilters[vgroup]) {
      updatedFilters[vgroup] = {}
    }

    const selectedSubAttributes: Record<string, number> = {}
    const variants = this.getAllEnumVariants(group)

    values.forEach(variantName => {
      const variant = variants.find(variant => variant[0] === variantName)

      if (variant) {
        selectedSubAttributes[variant[0]] = variant[1]
      }
    })

    if (this.currentMode) {
      selectedSubAttributes[this.currentMode] = 1
    }

    updatedFilters[vgroup][groupName] = selectedSubAttributes

    this.filterStore.setSelectedFilters(updatedFilters)
  }

  public updateCurrentGroupEnumFilter(values: string[]): void {
    this.updateEnumFilter(this.currentGroup, values)
  }

  public addValuesToEnumFilter(group: FilterGroup, values: string[]): void {
    const datasetValues = this.getDatasetEnumValues(group)

    this.updateEnumFilter(group, [...datasetValues, ...values])
  }

  public addValuesToCurrentGroupEnumFilter(values: string[]): void {
    this.addValuesToEnumFilter(this.currentGroup, values)
  }

  private getAllEnumVariants(group: FilterGroup): [string, number][] {
    const { groupName } = group

    return (
      this.datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === groupName,
      )?.variants ?? []
    )
  }

  private getDatasetEnumValues(group: FilterGroup): string[] {
    const { groupName } = group

    return (
      this.datasetStore.conditions.find(
        (element: any[]) => element[1] === groupName,
      )?.[3] ?? []
    )
  }
}

export default new FilterAttributesStore({
  datasetStore,
  filterStore,
})
