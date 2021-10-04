import { get } from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'

import { ReccntCommon, ReccntDisplayItem } from '@declarations'
import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

export class VariantStore {
  drawerVisible = false
  variant: ReccntCommon[] = []
  recordsDisplayConfig: any = {}
  index = 0
  dsName = ''
  generalTags: string[] = []
  optionalTags: string[] = []
  checkedTags: string[] = []
  noteText = ''

  constructor() {
    makeAutoObservable(this)
  }

  setNoteText(value: string) {
    this.noteText = value
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
      conf[record.name] = { isOpen: false, h: 1 }
    })

    this.recordsDisplayConfig = conf
  }

  handleAllRecordsOpen(status: boolean) {
    for (const key in this.recordsDisplayConfig) {
      if (
        Object.prototype.hasOwnProperty.call(this.recordsDisplayConfig, key)
      ) {
        this.recordsDisplayConfig[key].isOpen = status
      }
    }
  }

  updateRecordsDisplayConfig(name: string, height: number) {
    this.recordsDisplayConfig[name].h = height
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

  updateGeneralTags(tagName: string) {
    this.generalTags = [...this.generalTags, tagName]
  }

  async fetchVarinatInfoAsync() {
    if (datasetStore.isXL) return

    const [variantResponse, tagsResponse] = await Promise.all([
      fetch(getApiUrl(`reccnt?ds=${this.dsName}&rec=${this.index}`), {
        method: 'POST',
      }),
      fetch(getApiUrl(`ws_tags?ds=${this.dsName}&rec=${this.index}`)),
    ])

    const [variant, tagsData] = await Promise.all([
      variantResponse.json(),
      tagsResponse.json(),
    ])

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    runInAction(() => {
      this.variant = variant
      this.generalTags = get(tagsData, 'check-tags')

      this.checkedTags = checkedTags

      this.noteText = tagsData['rec-tags']['_note']
      this.initRecordsDisplayConfig()
    })
  }

  async fetchSelectedTagsAsync(params: string) {
    if (datasetStore.isXL) return

    const body = new URLSearchParams({
      ds: this.dsName,
      rec: this.index.toString(),
      tags: `{${params}}`,
    })

    const response = await fetch(getApiUrl(`ws_tags`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const tagsData = await response.json()

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    runInAction(() => {
      this.checkedTags = checkedTags

      this.initRecordsDisplayConfig()
    })
  }

  async fetchVarinatInfoForModalAsync(
    datasetName: string,
    orderNumber: number,
  ) {
    const variantResponse = await fetch(
      getApiUrl(`reccnt?ds=${datasetName}&rec=${orderNumber}`),
      {
        method: 'POST',
      },
    )

    const variant = await variantResponse.json()

    runInAction(() => {
      this.variant = variant
      this.initRecordsDisplayConfig()
    })
  }
}

export default new VariantStore()
