import { makeAutoObservable, runInAction } from 'mobx'

import { ReccntCommon, ReccntDisplayItem } from '@declarations'
import { getApiUrl } from '@core/get-api-url'

export class VariantStore {
  drawerVisible = false
  variant: ReccntCommon[] = []
  recordsDisplayConfig: { [key: string]: ReccntDisplayItem } = {}
  index = 0
  dsName = ''

  constructor() {
    makeAutoObservable(this)
  }

  prevVariant() {
    this.index -= 1
    this.fetchVarinatInfoAsync()
  }

  nextVariant() {
    this.index += 1
    this.fetchVarinatInfoAsync()
  }

  setDrawerVisible(visible: boolean) {
    this.drawerVisible = visible
  }

  initRecordsDisplayConfig() {
    const conf: { [key: string]: ReccntDisplayItem } = {}
    const isFirstInit = Object.keys(this.recordsDisplayConfig).length === 0

    if (!isFirstInit) return

    this.variant.map(record => {
      conf[record.name] = { isOpen: false }
    })

    this.recordsDisplayConfig = conf
  }

  setIndex(index: number) {
    const oldIndex = this.index

    this.index = index

    if (oldIndex !== index) {
      this.fetchVarinatInfoAsync()
    }
  }

  setDsName(dsName: string) {
    const oldDsName = this.dsName

    this.dsName = dsName

    if (oldDsName !== dsName) {
      this.fetchVarinatInfoAsync()
    }
  }

  async fetchVarinatInfoAsync() {
    const response = await fetch(
      getApiUrl(`reccnt?ds=${this.dsName}&rec=${this.index}`),
      {
        method: 'POST',
      },
    )

    const result = await response.json()

    runInAction(() => {
      this.variant = result
      this.initRecordsDisplayConfig()
    })
  }
}

export default new VariantStore()
