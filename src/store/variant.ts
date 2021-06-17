import { makeAutoObservable, runInAction } from 'mobx'

import { ReccntCommon } from '@declarations'
import { getApiUrl } from '@core/get-api-url'

export class VariantStore {
  drawerVisible = false
  variant: ReccntCommon[] = []
  activeRecord = ''
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

  setActiveRecord(name: string) {
    this.activeRecord = name
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
      this.activeRecord = result[0].title
    })
  }
}

export default new VariantStore()
