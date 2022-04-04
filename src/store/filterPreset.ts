import { makeAutoObservable, runInAction } from 'mobx'

import { t } from '@i18n'
import filterStore from '@store/filter'
import {
  DsStatArgumentsOptions,
  IDsStatArguments,
} from '@service-providers/filtering-regime'
import filteringRegimeProvider from '@service-providers/filtering-regime/filtering-regime.provider'
import { showToast } from '@utils/notifications/showToast'
import datasetStore from './dataset'

export const DEFAULT_PRESET_LABEL = '⏚'

class PresetStore {
  constructor() {
    makeAutoObservable(this)
  }

  async loadPresetAsync(filter: string, source?: string) {
    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      filter,
    }

    const result = await filteringRegimeProvider.getDsStat(body)

    filterStore.resetFilterCondition()

    runInAction(() => {
      datasetStore.updatePresetLoad(result, source)
      datasetStore.dsStat = result
    })
  }

  async deletePresetAsync(presetName: string) {
    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      conditions: datasetStore.conditions,
      instr: [DsStatArgumentsOptions.DELETE, presetName],
    }

    const result = await filteringRegimeProvider.getDsStat(body)

    datasetStore.dsStat = result
  }

  async joinPresetAsync(presetName: string) {
    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      instr: [DsStatArgumentsOptions.JOIN, presetName],
    }

    if (datasetStore.prevPreset) {
      body.filter = datasetStore.prevPreset
    } else {
      body.conditions = datasetStore.conditions
    }

    const result = await datasetStore.fetchDsStatAsync(false, body)

    await datasetStore.updatePresetLoad(result)
  }

  async updatePresetAsync(presetName: string) {
    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      conditions: datasetStore.conditions,
      instr: [DsStatArgumentsOptions.UPDATE, presetName],
    }

    const result = await filteringRegimeProvider.getDsStat(body)

    runInAction(() => {
      datasetStore.dsStat = result
    })

    await datasetStore.updatePresetLoad(result)
  }

  deletePreset(): void {
    this.deletePresetAsync(datasetStore.activePreset)

    datasetStore.resetActivePreset()

    datasetStore.resetPrevPreset()

    filterStore.resetActionName()

    showToast(t('header.presetFilterAction.delete'), 'success')
  }

  joinPreset(preset: string): void {
    this.joinPresetAsync(preset)

    filterStore.resetActionName()

    datasetStore.resetActivePreset()

    showToast(t('header.presetFilterAction.join'), 'success')

    preset && datasetStore.setPrevPreset(preset)
  }

  createPreset(createPresetName: string): void {
    createPresetName && this.updatePresetAsync(createPresetName)

    filterStore.resetActionName()

    datasetStore.setActivePreset(createPresetName)

    showToast(t('general.presetCreated'), 'success')
  }

  modifyPreset(preset: string): void {
    this.updatePresetAsync(preset)

    filterStore.resetActionName()

    showToast(t('header.presetFilterAction.modify'), 'success')

    preset && datasetStore.setPrevPreset(preset)
  }

  loadPreset(preset: string): void {
    if (preset === datasetStore.activePreset) return

    datasetStore.activePreset &&
      datasetStore.setPrevPreset(datasetStore.activePreset)

    datasetStore.setActivePreset(preset)

    if (filterStore.actionName) return

    if (datasetStore.prevPreset !== datasetStore.activePreset) {
      this.loadPresetAsync(preset, 'refiner')

      if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
    }
  }
}

export default new PresetStore()
