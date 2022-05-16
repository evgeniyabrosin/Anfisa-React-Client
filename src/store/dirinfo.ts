import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { makeAutoObservable, runInAction } from 'mobx'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { SortDirection } from '@core/sort-direction.enum'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import { DirInfoAsyncStore } from './common/dirinfo.async.store'

type SortDirectionsType = Record<SortDatasets, SortDirection>

class DirInfoStore {
  selectedDirinfoName = ''
  dsinfo: IDirInfoDatasetDescriptor | undefined
  sortType: SortDatasets | undefined = SortDatasets.Name
  filterValue = ''
  sortDirections: SortDirectionsType = {
    [SortDatasets.Name]: SortDirection.ASC,
    [SortDatasets.CreatedAt]: SortDirection.ASC,
  }
  infoFrameLink: string | string[] = ''
  iframeInfoFullscreen = false
  activeInfoName = ''

  readonly dirinfo = new DirInfoAsyncStore()

  get dirInfoData() {
    return this.dirinfo.data
  }

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

  setDsInfo(dsinfo: IDirInfoDatasetDescriptor) {
    this.dsinfo = dsinfo as any
  }

  get dsDistKeys() {
    let keys = Object.keys(get(this.dirInfoData, 'ds-dict', {}))

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
      keys.sort((a, b) => {
        if (
          !this.dirInfoData?.['ds-dict'][a] ||
          !this.dirInfoData?.['ds-dict'][b]
        ) {
          return 1
        }

        if (
          !this.dirInfoData?.['ds-dict'][a]['create-time'] ||
          !this.dirInfoData?.['ds-dict'][b]['create-time']
        ) {
          return 1
        }

        const aDate = new Date(this.dirInfoData?.['ds-dict'][a]['create-time'])
        const bDate = new Date(this.dirInfoData?.['ds-dict'][b]['create-time'])

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

  resetData() {
    this.selectedDirinfoName = ''
    this.filterValue = ''
    this.infoFrameLink = ''
    this.iframeInfoFullscreen = false
    this.activeInfoName = ''
  }
}

export default new DirInfoStore()
