import { get } from 'lodash'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { IGridLayout, ReccntDisplayItem } from '@declarations'
import mainTableStore from '@store/ws/main-table.store'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import {
  IReccntArguments,
  TRecCntResponse,
} from '@service-providers/dataset-level/dataset-level.interface'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import datasetStore from '../dataset'

const DRAWER_DEFAULT_WIDTH = 6
const DRAWER_DEFAULT_HEIGHT = 1
const DRAWER_DEFAULT_X = 0

export class VariantStore {
  drawerVisible = false
  variant: TRecCntResponse[] = []
  recordsDisplayConfig: any = {}
  wsDrawerVariantsLayout: IGridLayout[] = []
  modalDrawerVariantsLayout: IGridLayout[] = []
  index = 0
  choosedIndex = 0
  dsName = ''
  generalTags: string[] = []
  optionalTags: string[] = []
  checkedTags: string[] = []
  tagsWithNotes: any = {}
  currentTag = ''
  noteText = ''
  isActiveVariant = false

  isModalNotesVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  setNoteText(value: string) {
    this.noteText = value
  }

  setIsActiveVariant() {
    this.isActiveVariant = true
  }

  resetIsActiveVariant() {
    this.isActiveVariant = false
  }

  prevVariant() {
    mainTableStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.index) - 1
          ])
    this.fetchVarinatInfoAsync()
  }

  nextVariant() {
    mainTableStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          mainTableStore.filteredNo[
            mainTableStore.filteredNo.indexOf(this.index) + 1
          ])

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

  checkRecodsDisplaying() {
    Object.values(this.recordsDisplayConfig).map((record: any) => {
      record.h > 1 ? (record.isOpen = true) : (record.isOpen = false)
    })
  }

  setIndex(index: number) {
    runInAction(() => {
      this.index = index
      this.fetchVarinatInfoAsync()
    })
  }

  setDsName(settedDsName: string) {
    this.dsName = settedDsName
  }

  updateGeneralTags(tagName: string) {
    this.generalTags = [...this.generalTags, tagName]
  }

  async fetchVarinatInfoAsync() {
    if (datasetStore.isXL) return

    const details = toJS(
      mainTableStore.wsRecords?.find(record => record.no === this.index),
    )

    const label = details?.lb
    const geneNameInBrackets = label?.split(' ')[0] ?? ''
    const geneName = geneNameInBrackets.slice(1, geneNameInBrackets.length - 1)

    const isVariantWithoutGene = geneName === 'None'

    // create reccntBody with URLSearchParams
    const reccntArguments: IReccntArguments = {
      ds: this.dsName,
      rec: String(this.index),
    }

    if (!isVariantWithoutGene) {
      reccntArguments.details = details?.dt
    }

    const [variantResponse, tagsResponse] = await Promise.all([
      datasetProvider.getRecCnt(reccntArguments),
      wsDatasetProvider.getWsTags({ ds: this.dsName, rec: this.index }),
    ])

    const [variant, tagsData] = await Promise.all([
      variantResponse,
      tagsResponse,
    ])

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    const optionalTags = get(tagsData, 'op-tags').filter(
      (tag: string) => tag !== '_note',
    )

    runInAction(() => {
      this.variant = variant
      this.generalTags = get(tagsData, 'check-tags')
      this.optionalTags = optionalTags
      this.checkedTags = checkedTags
      this.tagsWithNotes = get(tagsData, 'rec-tags')
      this.noteText = tagsData['rec-tags']['_note'] as string
      this.initRecordsDisplayConfig()

      if (this.wsDrawerVariantsLayout.length === 0) {
        this.createDrawerVariantsLayout(variant)
      }
    })
  }

  async fetchSelectedTagsAsync(tagList: TTagsDescriptor) {
    if (datasetStore.isXL) return

    const wsTags = await wsDatasetProvider.getWsTags({
      ds: this.dsName,
      rec: this.index,
      tags: tagList,
    })

    const checkedTags = Object.keys(wsTags['rec-tags']).filter(
      tag => tag !== '_note',
    )

    runInAction(() => {
      this.checkedTags = checkedTags
      this.tagsWithNotes = wsTags['rec-tags']
      this.initRecordsDisplayConfig()
    })
  }

  async fetchVarinatInfoForModalAsync(
    datasetName: string,
    orderNumber: number,
  ) {
    const variant = await datasetProvider.getRecCnt({
      ds: datasetName,
      rec: String(orderNumber),
    })

    runInAction(() => {
      this.variant = variant

      if (this.modalDrawerVariantsLayout.length === 0) {
        this.initRecordsDisplayConfig()

        this.createDrawerVariantsLayout(variant, 'modal')
      }
    })
  }

  createDrawerVariantsLayout(data: any[], source?: string) {
    if (source === 'modal') {
      data.map((item, index) =>
        this.modalDrawerVariantsLayout.push({
          y: index,
          x: DRAWER_DEFAULT_X,
          w: DRAWER_DEFAULT_WIDTH,
          h: DRAWER_DEFAULT_HEIGHT,
          i: item.name,
        }),
      )
    } else {
      data.map((item, index) =>
        this.wsDrawerVariantsLayout.push({
          y: index,
          x: DRAWER_DEFAULT_X,
          w: DRAWER_DEFAULT_WIDTH,
          h: DRAWER_DEFAULT_HEIGHT,
          i: item.name,
        }),
      )

      window.sessionStorage.setItem(
        'gridLayout',
        JSON.stringify(this.wsDrawerVariantsLayout),
      )
    }
  }

  updateTagsWithNotes(tagWithNote: any[], operation = 'add') {
    if (operation === 'add') {
      let keyProp = ''

      for (const key in this.tagsWithNotes) {
        if (key === tagWithNote[0]) {
          keyProp = key
        }
      }

      keyProp
        ? (this.tagsWithNotes[keyProp] = tagWithNote[1])
        : (this.tagsWithNotes[tagWithNote[0]] = tagWithNote[1])
    } else {
      delete this.tagsWithNotes[tagWithNote[0]]
    }
  }

  showModalNotes() {
    this.isModalNotesVisible = true
  }

  hideModalNotes() {
    this.isModalNotesVisible = false
  }

  setCurrentTag(tag: string) {
    this.currentTag = tag
  }

  resetData() {
    this.dsName = ''
    this.wsDrawerVariantsLayout = []
    this.modalDrawerVariantsLayout = []
    this.recordsDisplayConfig = ''
  }
}

export default new VariantStore()