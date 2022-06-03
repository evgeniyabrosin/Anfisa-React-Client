import { get } from 'lodash'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import mainTableStore from '@store/ws/main-table.store'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import {
  HgModes,
  IReccntArguments,
  ITableAspectDescriptor,
  TAspectDescriptor,
  TRecCntResponse,
} from '@service-providers/dataset-level/dataset-level.interface'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import { findElementInRow } from '@utils/mian-table/find-element-in-row'
import datasetStore from '../dataset/dataset'

export class VariantStore {
  drawerVisible = false
  variant: TRecCntResponse[] = []
  index = 0
  dsName = ''
  generalTags: string[] = []
  optionalTags: string[] = []
  checkedTags: string[] = []
  tagsWithNotes: any = {}
  currentTag = ''
  noteText = ''
  isActiveVariant = false

  isModalNotesVisible = false
  isTagsModified = false

  constructor() {
    makeAutoObservable(this)
  }

  public get aspects(): TAspectDescriptor[] {
    return toJS(this.variant)
  }

  public get generalAspect(): ITableAspectDescriptor | undefined {
    return this.variant.find(aspect => aspect.name === 'view_gen') as
      | ITableAspectDescriptor
      | undefined
  }

  public get locus(): string {
    const { locusMode } = datasetStore
    const rows = this.generalAspect?.rows ?? []

    const hg19locus = findElementInRow(rows, 'hg19')
    const hg38locus = findElementInRow(rows, 'hg38')

    return locusMode === HgModes.HG19 ? hg19locus : hg38locus
  }

  public get genes(): string {
    const variantWithoutGenesName = 'None'
    const rows = this.generalAspect?.rows ?? []

    return findElementInRow(rows, 'genes') || variantWithoutGenesName
  }

  public get igvUrl(): string | undefined {
    const igvUrls = datasetStore.dsInfoData?.igvUrls

    if (!igvUrls) {
      return
    }

    let names: string[] = []

    const qualityAspect = this.variant.find(
      aspect => aspect.name === 'view_qsamples',
    ) as ITableAspectDescriptor | undefined

    if (qualityAspect) {
      names = qualityAspect.rows[0]?.cells
        .map(cell => cell[0].split(': ')[1])
        .filter(Boolean)
    }

    if (!this.generalAspect) {
      return undefined
    }

    const locus = this.generalAspect.rows
      .find(row => row.name === 'hg38')
      ?.cells[0]?.[0]?.split(' ')[0]

    if (!locus) {
      return undefined
    }

    return new URLSearchParams({
      locus,
      names: names.join(','),
      igvUrls: JSON.stringify(igvUrls),
    }).toString()
  }

  setIsTagsModified(value: boolean) {
    this.isTagsModified = value
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
      rec: this.index,
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
    })
  }

  async fetchVarinatInfoForModalAsync(
    datasetName: string,
    orderNumber: number,
  ) {
    const variant = await datasetProvider.getRecCnt({
      ds: datasetName,
      rec: orderNumber,
    })

    runInAction(() => {
      this.variant = variant
    })
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
  }
}

export default new VariantStore()
