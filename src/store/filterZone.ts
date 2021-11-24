import { difference } from 'lodash'
import { makeAutoObservable } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

class ZoneStore {
  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  localGenes: string[] = []
  localGenesList: string[] = []
  localSamples: string[] = []
  localTags: string[] = []

  isFather: boolean | undefined = false
  isMother: boolean | undefined = false
  isProband: boolean | undefined = false

  isModeNOT = false
  isModeWithNotes = false

  constructor() {
    makeAutoObservable(this)
  }

  addGene(gene: string) {
    this.localGenes = [...this.localGenes, gene]
  }

  removeGene(geneName: string, type: string) {
    this.localGenes = this.localGenes.filter(gene => geneName !== gene)

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenes')

      datasetStore.removeZone(['Symbol', this.selectedGenes])
    }
  }

  unselectAllGenes() {
    this.localGenes = []
  }

  addGenesList(gene: string) {
    this.localGenesList = [...this.localGenesList, gene]
  }

  removeGenesList(geneName: string, type: string) {
    this.localGenesList = this.localGenesList.filter(
      genesList => geneName !== genesList,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenesList')

      datasetStore.removeZone(['Panels', this.selectedGenesList])
    }
  }

  unselectAllGenesList() {
    this.localGenesList = []
  }

  addSample(sample: string) {
    this.localSamples = [...this.localSamples, sample]
  }

  removeSample(sample: string, type: string) {
    this.localSamples = this.localSamples.filter(
      sampleItem => sampleItem !== sample,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isSamples')

      datasetStore.removeZone(['Has_Variant', this.selectedSamples])
    }

    this.paintSelectedSamples()
  }

  paintSelectedSamples() {
    const sampleTypes = new Set(
      this.selectedSamples.map(sample => sample.slice(0, 7).trim()),
    )

    if (sampleTypes.has('proband')) {
      this.isProband = true
    } else {
      this.isProband = false
    }

    if (sampleTypes.has('mother')) {
      this.isMother = true
    } else {
      this.isMother = false
    }

    if (sampleTypes.has('father')) {
      this.isFather = true
    } else {
      this.isFather = false
    }
  }

  unselectAllSamples = (type?: string) => {
    this.localSamples = []

    if (type === 'clearAll') {
      this.isFather = false
      this.isMother = false
      this.isProband = false
    }
  }

  addLocalTag(tagName: string) {
    this.localTags = [...this.localTags, tagName]
  }

  removeLocalTag(tagName: string, type: string) {
    this.localTags = this.localTags.filter(tag => tag !== tagName)

    tagName === '_note' && this.resetModeWithNotes()

    if (type === 'fast') {
      this.createSelectedZoneFilter('isTags')

      datasetStore.removeZone(['_tags', this.selectedTags])
    }
  }

  unselectAllTags() {
    this.localTags = []
    this.resetModeNOT()
    this.resetModeWithNotes()
  }

  createSelectedZoneFilter(type: string) {
    if (type === 'isGenes') this.selectedGenes = this.localGenes

    if (type === 'isGenesList') this.selectedGenesList = this.localGenesList

    if (type === 'isSamples') this.selectedSamples = this.localSamples

    if (type === 'isTags') this.selectedTags = this.localTags
  }

  syncSelectedAndLocalFilters(type: string) {
    if (type === 'isGenes') this.localGenes = this.selectedGenes

    if (type === 'isGenesList') this.localGenesList = this.selectedGenesList

    if (type === 'isSamples') this.localSamples = this.selectedSamples

    if (type === 'isTags') this.localTags = this.selectedTags
  }

  resetAllSelectedItems() {
    this.selectedGenes = []
    this.selectedGenesList = []
    this.selectedSamples = []
    this.selectedTags = []
    this.localGenes = []
    this.localGenesList = []
    this.localSamples = []
    this.localTags = []
    this.isFather = false
    this.isMother = false
    this.isProband = false
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
