import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import filterStore from '@store/filter'
import {
  DsStatArgumentsOptions,
  IDsStatArguments,
} from '@service-providers/filtering-regime'
import { showToast } from '@utils/notifications/showToast'
import datasetStore from './dataset'

export const DEFAULT_PRESET_LABEL = '⏚'

class PresetStore {
  private _isPresetDataModified = false

  constructor() {
    makeAutoObservable(this)
  }

  public get isPresetDataModified() {
    return this._isPresetDataModified
  }

  public setIsPresetDataModified() {
    this._isPresetDataModified = true
  }

  public resetIsPresetDataModified() {
    this._isPresetDataModified = false
  }

  async loadPresetAsync(filter: string) {
    this.resetIsPresetDataModified()

    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      filter,
    }

    const result = await datasetStore.fetchDsStatAsync(false, body)

    datasetStore.updatePresetLoad(result)
  }

  async deletePresetAsync(presetName: string) {
    this.resetIsPresetDataModified()

    const { conditions } = filterStore

    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      conditions: conditions,
      instr: [DsStatArgumentsOptions.DELETE, presetName],
    }

    const result = await datasetStore.fetchDsStatAsync(false, body)

    datasetStore.updatePresetLoad(result)
  }

  async joinPresetAsync(presetName: string) {
    this.resetIsPresetDataModified()

    const { conditions } = filterStore

    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      instr: [DsStatArgumentsOptions.JOIN, presetName],
      conditions: conditions,
    }

    const result = await datasetStore.fetchDsStatAsync(false, body)

    datasetStore.updatePresetLoad(result)
  }

  async updatePresetAsync(presetName: string) {
    const { conditions } = filterStore

    const body: IDsStatArguments = {
      ds: datasetStore.datasetName,
      conditions: conditions,
      instr: [DsStatArgumentsOptions.UPDATE, presetName],
    }

    const result = await datasetStore.fetchDsStatAsync(false, body)

    datasetStore.updatePresetLoad(result)
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
    this.resetIsPresetDataModified()

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
      this.loadPresetAsync(preset)

      if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
    }
  }
}

export default new PresetStore()
