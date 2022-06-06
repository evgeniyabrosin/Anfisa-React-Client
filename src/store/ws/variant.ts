import { get } from 'lodash'
import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { VariantAspectsAsyncStore } from '@store/variant-aspects.async.store'
import mainTableStore from '@store/ws/main-table.store'
import { IReccntArguments } from '@service-providers/dataset-level'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import datasetStore from '../dataset/dataset'

export class VariantStore {
  readonly record = new VariantAspectsAsyncStore({ keepPreviousData: true })

  drawerVisible = false
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

    reaction(
      () => this.recordQuery,
      query => {
        if (query) {
          this.record.setQuery(query)
        } else {
          this.record.reset()
        }
      },
    )
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

    const tagsData = await wsDatasetProvider.getWsTags({
      ds: this.dsName,
      rec: this.index,
    })

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    const optionalTags = get(tagsData, 'op-tags').filter(
      (tag: string) => tag !== '_note',
    )

    runInAction(() => {
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

  private get recordQuery(): IReccntArguments | undefined {
    if (!this.dsName) {
      return undefined
    }

    const details = mainTableStore.wsRecords?.find(
      record => record.no === this.index,
    )
    const query: IReccntArguments = {
      ds: this.dsName,
      rec: this.index,
    }

    const isVariantWithoutGene = details?.lb.includes('[None]')

    if (!isVariantWithoutGene) {
      query.details = details?.dt
    }

    return query
  }
}

export default new VariantStore()
