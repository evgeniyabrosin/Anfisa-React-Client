import { difference } from 'lodash'
import { makeAutoObservable } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

class ZoneStore {
  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  isModeNOT = false
  isModeWithNotes = false

  constructor() {
    makeAutoObservable(this)
  }

  addGene(gene: string) {
    this.selectedGenes = [...this.selectedGenes, gene]
  }

  removeGene(geneName: string) {
    this.selectedGenes = this.selectedGenes.filter(gene => geneName !== gene)

    datasetStore.addZone(['Symbol', this.selectedGenes])
    datasetStore.fetchWsListAsync()
    datasetStore.clearZone()
  }

  unselectAllGenes() {
    this.selectedGenes = []
  }

  addGenesList(gene: string) {
    this.selectedGenesList = [...this.selectedGenesList, gene]
  }

  removeGenesList(geneName: string) {
    this.selectedGenesList = this.selectedGenesList.filter(
      genesList => geneName !== genesList,
    )

    datasetStore.addZone(['Panels', this.selectedGenesList])
    datasetStore.fetchWsListAsync()
    datasetStore.clearZone()
  }

  unselectAllGenesList() {
    this.selectedGenesList = []
  }

  addSample(sample: string) {
    this.selectedSamples = [...this.selectedSamples, sample]
  }

  removeSample(sample: string) {
    this.selectedSamples = this.selectedSamples.filter(
      sampleItem => sampleItem !== sample,
    )

    datasetStore.addZone(['Has_Variant', this.selectedSamples])
    datasetStore.fetchWsListAsync()
  }

  unselectAllSamples() {
    this.selectedSamples = []
  }

  addTag(tagName: string) {
    this.selectedTags = [...this.selectedTags, tagName]
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)

    tagName === '_note' && this.resetModeWithNotes()

    datasetStore.addZone(['_tags', this.selectedSamples])
    datasetStore.fetchWsListAsync()

    // TODO: removed this.fetchTagSelectAsync()
  }

  unselectAllTags() {
    this.selectedTags = []
    this.resetModeNOT()
    this.resetModeWithNotes()
  }

  resetAllSelectedItems() {
    this.unselectAllGenes()
    this.unselectAllGenesList()
    this.unselectAllSamples()
    this.unselectAllTags()
  }

  resetCertainSelectedItems(type: string) {
    if (type === 'genes') {
      this.unselectAllGenesList()
      this.unselectAllSamples()
      this.unselectAllTags()
    }

    if (type === 'genesList') {
      this.unselectAllGenes()
      this.unselectAllSamples()
      this.unselectAllTags()
    }

    if (type === 'samples') {
      this.unselectAllGenes()
      this.unselectAllGenesList()
      this.unselectAllTags()
    }

    if (type === 'tags') {
      this.unselectAllGenes()
      this.unselectAllGenesList()
      this.unselectAllSamples()
    }
  }

  async fetchTagSelectAsync() {
    if (this.selectedTags.length === 0 && !this.isModeWithNotes) {
      datasetStore.indexTabReport = 0
      await datasetStore.fetchTabReportAsync()

      return
    }

    this.isModeWithNotes && this.selectedTags.push('_note')

    if (!this.isModeWithNotes && this.selectedTags.includes('_note')) {
      this.selectedTags = this.selectedTags.filter(item => item !== '_note')
    }

    const filteredData = await Promise.all(
      (this.isModeNOT
        ? difference(datasetStore.tags, this.selectedTags)
        : this.selectedTags
      ).map(async tag => {
        const response = await fetch(
          getApiUrl(`tag_select?ds=${datasetStore.datasetName}&tag=${tag}`),
        )

        const result = await response.json()
        const currentNo = result['tag-rec-list']

        return currentNo
      }),
    )

    const uniqueNo = Array.from(new Set(filteredData.flat()))

    datasetStore.indexFilteredNo = 0
    datasetStore.filteredNo = uniqueNo

    await datasetStore.fetchFilteredTabReportAsync()
  }

  setModeNOT() {
    this.isModeNOT = true
  }

  resetModeNOT() {
    this.isModeNOT = false
  }

  setModeWithNotes() {
    this.isModeWithNotes = true
  }

  resetModeWithNotes() {
    this.isModeWithNotes = false
  }
}

export default new ZoneStore()
