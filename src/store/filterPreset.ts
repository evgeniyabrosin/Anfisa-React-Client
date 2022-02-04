import { makeAutoObservable, runInAction } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import filterStore from '@store/filter'
import datasetStore from './dataset'

class PresetStore {
  constructor() {
    makeAutoObservable(this)
  }

  async loadPresetAsync(filter: string, source?: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      filter,
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    filterStore.resetFilterCondition()

    runInAction(() => {
      datasetStore.updatePresetLoad(result, source)
      datasetStore.dsStat = result
    })
  }

  async deletePresetAsync(presetName: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(datasetStore.conditions),
      instr: JSON.stringify(['DELETE', presetName]),
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    datasetStore.dsStat = result
  }

  async joinPresetAsync(presetName: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(datasetStore.conditions),
      instr: JSON.stringify(['JOIN', presetName]),
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    await datasetStore.updatePresetLoad(result)
  }

  async updatePresetAsync(presetName: string) {
    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      conditions: JSON.stringify(datasetStore.conditions),
      instr: JSON.stringify(['UPDATE', presetName]),
    })

    const response = await fetch(getApiUrl('ds_stat'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const result = await response.json()

    runInAction(() => {
      datasetStore.dsStat = result
    })

    await datasetStore.updatePresetLoad(result)
  }
}

export default new PresetStore()
