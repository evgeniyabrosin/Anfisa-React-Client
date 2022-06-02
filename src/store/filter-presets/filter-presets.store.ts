import orderBy from 'lodash/orderBy'
import { makeAutoObservable, reaction, toJS } from 'mobx'

import { t } from '@i18n'
import {
  ISolutionEntryDescription,
  TCondition,
} from '@service-providers/common'
import { filteringProvider } from '@service-providers/filtering-regime'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import datasetStore from '../dataset/dataset'
import { AvailablePresetsAsyncStore } from './available-presets.async.store'

export class FilterPresetsStore {
  private _activePreset: string = ''

  private readonly presets = new AvailablePresetsAsyncStore()

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        this.resetActivePreset()
        if (datasetName) {
          this.presets.setQuery({ datasetName })
        } else {
          this.presets.reset()
        }
      },
    )
  }

  public get isFetchingPresets(): boolean {
    return this.presets.isFetching
  }

  public get availablePresets(): ISolutionEntryDescription[] {
    return orderBy(toJS(this.presets.data), ['name']) ?? []
  }

  public get activePreset(): string {
    return this._activePreset
  }

  public get activePresetInfo(): ISolutionEntryDescription | undefined {
    const presetName = this.activePreset

    return this.availablePresets.find(preset => preset.name === presetName)
  }

  public setActivePreset(preset: string): void {
    this._activePreset = preset
  }

  public resetActivePreset() {
    this.setActivePreset('')
  }

  public createPreset(
    presetName: string,
    conditions: ReadonlyArray<TCondition>,
  ): void {
    if (!validatePresetName(presetName)) {
      showToast(t('filter.notValidName'), 'error')

      return
    }

    filteringProvider
      .updateFilterPreset({
        ds: datasetStore.datasetName,
        conditions,
        presetName,
      })
      .then(
        () => {
          this.presets.invalidate()
          this.setActivePreset(presetName)
          showToast(
            t('header.presetAction.success.create', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.create', { presetName }),
            'error',
          )
        },
      )
  }

  public modifyPreset(
    presetName: string,
    conditions: ReadonlyArray<TCondition>,
  ): void {
    filteringProvider
      .updateFilterPreset({
        ds: datasetStore.datasetName,
        conditions,
        presetName,
      })
      .then(
        () => {
          this.setActivePreset(presetName)
          showToast(
            t('header.presetAction.success.modify', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.modify', { presetName }),
            'error',
          )
        },
      )
  }

  deletePreset(presetName: string): void {
    if (this.activePreset === presetName) {
      this.resetActivePreset()
    }

    filteringProvider
      .deleteFilterPreset({
        ds: datasetStore.datasetName,
        presetName,
      })
      .then(
        () => {
          this.presets.invalidate()
          showToast(
            t('header.presetAction.success.delete', { presetName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.presetAction.error.delete', { presetName }),
            'error',
          )
        },
      )
  }
}
