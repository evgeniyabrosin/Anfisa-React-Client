import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { makeAutoObservable, runInAction } from 'mobx'

import { DirInfoType, DsDistItem, DsInfoType } from '@declarations'
import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { getApiUrl } from '@core/get-api-url'
import { SortDirection } from '@core/sort-direction.enum'

type SortDirectionsType = Record<SortDatasets, SortDirection>

class DirInfoStore {
  dirinfo: DirInfoType = {}
  selectedDirinfoName = ''
  dsinfo: DsInfoType = {}
  sortType: SortDatasets | undefined
  filterValue = ''
  sortDirections: SortDirectionsType = {
    [SortDatasets.Name]: SortDirection.ASC,
    [SortDatasets.CreatedAt]: SortDirection.ASC,
  }
  infoFrameLink: string | string[] = ''
  iframeInfoFullscreen = false
  activeInfoName = ''

  constructor() {
    makeAutoObservable(this)
  }

  setActiveInfoName(name: string) {
    this.activeInfoName = name
  }

  setSelectedDirinfoName(name: string) {
    this.selectedDirinfoName = name
  }

  setInfoFrameLink(link: string | string[]) {
    this.infoFrameLink = link
  }

  setIframeInfoFullscreen(visible: boolean) {
    this.iframeInfoFullscreen = visible
  }

  setSortType(sortType?: SortDatasets) {
    this.sortType = sortType
  }

  setFilterValue(value: string) {
    this.filterValue = value
  }

  setSortDirection() {
    const clonedSortDirection: SortDirectionsType = Object.assign(
      this.sortDirections,
    )

    if (this.sortType) {
      clonedSortDirection[this.sortType] =
        clonedSortDirection[this.sortType] === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC
    }

    runInAction(() => {
      this.sortDirections = clonedSortDirection
    })
  }

  setDsInfo(dsinfo: DsDistItem) {
    this.dsinfo = dsinfo as any
  }

  get dsDistKeys() {
    let keys = Object.keys(get(this.dirinfo, 'ds-dict', {}))

    if (this.filterValue) {
      keys = keys.filter(key =>
        key.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase()),
      )
    }

    if (this.sortType === SortDatasets.Name) {
      return orderBy(
        keys,
        i => i,
        this.sortDirections[this.sortType].toLocaleLowerCase() as
          | 'asc'
          | 'desc',
      )
    }

    if (this.sortType === SortDatasets.CreatedAt) {
      keys.sort((a: string, b: string) => {
        if (!this.dirinfo['ds-dict'][a] || !this.dirinfo['ds-dict'][b]) {
          return 1
        }

        if (
          !this.dirinfo['ds-dict'][a]['create-time'] ||
          !this.dirinfo['ds-dict'][b]['create-time']
        ) {
          return 1
        }

        const aDate = new Date(this.dirinfo['ds-dict'][a]['create-time'])
        const bDate = new Date(this.dirinfo['ds-dict'][b]['create-time'])

        return this.sortDirections.CreatedAt === SortDirection.ASC
          ? +aDate - +bDate
          : +bDate - +aDate
      })
    }

    return keys
  }

  get ancestorsDsInfo() {
    const ancestors: any[] = get(this, 'dsinfo.ancestors', [])
    const clonedAncestors = cloneDeep(ancestors)

    if (
      clonedAncestors[0] &&
      clonedAncestors[0][1] &&
      clonedAncestors[0][1][1]
    ) {
      const formatedData = clonedAncestors[0][1][1].map((item: any) => {
        if (item[0] === 'Info') {
          item[0] = 'Base Info'
        }

        return item
      })

      clonedAncestors[0][1][1] = formatedData

      return clonedAncestors
    }

    return [[]]
  }

  async fetchDirInfoAsync() {
    const response = await fetch(getApiUrl('dirinfo'))
    const res = await response.json()

    runInAction(() => {
      this.dirinfo = res
    })
  }

  async fetchDsinfoAsync(name: string) {
    const response = await fetch(getApiUrl(`dsinfo?ds=${name}`), {
      method: 'POST',
    })

    const result = await response.json()

    runInAction(() => {
      this.dsinfo = result
    })
  }
}

export default new DirInfoStore()
