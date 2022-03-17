import { get } from 'lodash'
import { makeAutoObservable } from 'mobx'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import presetStore from '@store/filterPreset'
import { compareConditions } from '@utils/filter-refiner/compareConditions'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'

class FilterControlRefinerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get activePreset(): string {
    return datasetStore.activePreset
  }

  get presets(): string[] {
    return get(datasetStore, 'dsStat.filter-list', [])
      .filter(this.isPresetAbleToBeModified)
      .map((preset: FilterList) => preset.name)
  }

  public isPresetAbleToBeModified(preset: FilterList): boolean {
    return filterStore.actionName === ActionFilterEnum.Delete ||
      filterStore.actionName === ActionFilterEnum.Modify
      ? !preset.standard
      : true
  }

  public applyAction = (
    createPresetName: string,
    isSelectedFiltersEmpty: boolean,
  ): void => {
    if (filterStore.actionName === ActionFilterEnum.Delete) {
      presetStore.deletePreset()
    }

    if (filterStore.actionName === ActionFilterEnum.Join) {
      if (!datasetStore.activePreset) {
        showToast(t('error.choosePresetFirst'), 'error')

        return
      }

      const isConditionsAbleToJoin = compareConditions({
        currentConditions: datasetStore.conditions,
        startConditions: datasetStore.startPresetConditions,
        currentPreset: datasetStore.activePreset,
        prevPreset: datasetStore.prevPreset,
      })

      if (!isConditionsAbleToJoin) {
        showToast(t('error.cantJoinTheSamePreset'), 'error')

        return
      }

      presetStore.joinPreset(datasetStore.activePreset)
    }

    if (filterStore.actionName === ActionFilterEnum.Create) {
      const isPresetNameValid = validatePresetName(createPresetName)

      if (!isPresetNameValid) {
        showToast(t('filter.notValidName'), 'error')

        return
      }

      if (isSelectedFiltersEmpty) {
        showToast(t('error.chooseFiltersFirst'), 'error')

        return
      }

      presetStore.createPreset(createPresetName)
    }

    if (filterStore.actionName === ActionFilterEnum.Modify) {
      if (!datasetStore.activePreset) {
        showToast(t('error.choosePresetFirst'), 'error')

        return
      }

      const isConditionsAbleToModify = compareConditions({
        currentConditions: datasetStore.conditions,
        startConditions: datasetStore.startPresetConditions,
        currentPreset: datasetStore.activePreset,
        prevPreset: datasetStore.prevPreset,
      })

      if (!isConditionsAbleToModify) {
        showToast(t('error.noChangesToModify'), 'error')

        return
      }

      presetStore.modifyPreset(datasetStore.activePreset)
    }
  }
}

export default new FilterControlRefinerStore()
