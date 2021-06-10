import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'

import { ReccntType } from '@declarations'
import { getApiUrl } from '@core/get-api-url'

class VariantStore {
  drawerVisible = false
  variant: ReccntType[] = []
  activeTab = ''
  index = 0
  dsName = ''

  constructor() {
    makeAutoObservable(this)
  }

  nextVariant() {
    this.index += 1
    this.fetchVarinatInfoAsync()
  }

  setDrawerVisible(visible: boolean) {
    this.drawerVisible = visible
  }

  setActiveTab(name: string) {
    this.activeTab = name
  }

  setIndex(index: number) {
    this.index = index
  }

  setDsName(dsName: string) {
    this.dsName = dsName
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
      this.activeTab = result[0].title
    })
  }

  get getTabs() {
    const tabList = get(this, 'variant', []) as { title: string }[]

    return tabList.map(tab => tab.title)
  }
}

export default new VariantStore()
