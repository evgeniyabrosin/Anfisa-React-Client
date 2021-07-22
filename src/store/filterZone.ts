import { makeAutoObservable } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

class ZoneStore {
  selectedTags: string[] = []
  selectedGenes: string[] = []
  selectedSamples: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addTag(tagName: string) {
    this.selectedTags = [...this.selectedTags, tagName]
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
  }

  unselectAllTags = () => {
    this.selectedTags = []
  }

  addSample(sample: string) {
    this.selectedSamples = [...this.selectedSamples, sample]
  }

  removeSample(sample: string) {
    this.selectedSamples = this.selectedSamples.filter(
      sampleItem => sampleItem !== sample,
    )
  }

  unselectAllSamples = () => {
    this.selectedSamples = []
  }

  addGene(gene: string) {
    this.selectedGenes = [...this.selectedGenes, gene]
  }

  removeGene(geneName: string) {
    this.selectedGenes = this.selectedGenes.filter(gene => geneName !== gene)
  }

  unselectAllGenes = () => {
    this.selectedGenes = []
  }

  fetchTagSelectAsync = async () => {
    if (this.selectedTags.length === 0) {
      datasetStore.indexTabReport = 0
      await datasetStore.fetchTabReportAsync()

      return
    }

    const response = await fetch(
      getApiUrl(
        `tag_select?ds=${datasetStore.datasetName}&tag=${this.selectedTags[0]}`,
      ),
    )

    const result = await response.json()

    datasetStore.indexFilteredNo = 0
    datasetStore.filteredNo = result['tag-rec-list']

    await datasetStore.fetchFilteredTabReportAsync()
  }
}

export default new ZoneStore()
