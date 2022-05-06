import { makeAutoObservable, runInAction } from 'mobx'

import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { HgModes } from '@service-providers/dataset-level/dataset-level.interface'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { IDsInfo } from './../service-providers/dataset-level/dataset-level.interface'

export class DatasetStore {
  datasetName = ''
  dsInfo: IDsInfo | Record<string, unknown> = {}
  isXL?: boolean = undefined

  constructor() {
    makeAutoObservable(this)
  }

  setDatasetName(datasetName: string) {
    this.datasetName = datasetName
  }

  setDsInfo(dsInfo: IDirInfoDatasetDescriptor) {
    this.dsInfo = dsInfo as any
  }

  setIsXL(value: boolean) {
    this.isXL = value
  }

  resetData() {
    this.datasetName = ''
    this.dsInfo = {}
  }

  async initDatasetAsync(datasetName: string = this.datasetName) {
    this.datasetName = datasetName

    await this.fetchDsinfoAsync(datasetName)
  }

  async fetchDsinfoAsync(name: string) {
    const dsInfo = await datasetProvider.getDsInfo({ ds: name })

    runInAction(() => {
      this.dsInfo = dsInfo
    })

    this.setIsXL(dsInfo?.kind === 'xl')
  }

  // TODO: update type after implantion IDsInfo interface
  get locusMode(): HgModes {
    const meta: any = this.dsInfo.meta
    const hgModeValue: HgModes = meta?.modes?.[0]
    return hgModeValue
  }
}

export default new DatasetStore()
