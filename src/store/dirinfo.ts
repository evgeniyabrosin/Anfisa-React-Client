import orderBy from 'lodash/orderBy'
import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'
import { DirInfoType, DsInfoType } from '../..'
import { SortDatasets } from '../core/enum/sort-datasets.enum'
import { getApiUrl } from '../core/get-api-url'
import { SortDirection } from '../core/sort-direction.enum'

type SortDirectionsType = Record<SortDatasets, SortDirection>

class DirInfoStore {
	dirinfo: DirInfoType = {}
	selectedDirinfoName = ''
	dsinfo: DsInfoType = {}
	sortType: SortDatasets | undefined
	sortDirections: SortDirectionsType = {
		[SortDatasets.Name]: SortDirection.ASC,
		[SortDatasets.CreatedAt]: SortDirection.ASC
	}

	constructor() {
		makeAutoObservable(this)
	}

	setSelectedDirinfoName(name: string) {
		this.selectedDirinfoName = name
	}

	setSortType(sortType?: SortDatasets) {
		this.sortType = sortType

	}

	setSortDirection() {
		const clonedSortDirection: SortDirectionsType = Object.assign(this.sortDirections)

		if (this.sortType) {
			clonedSortDirection[this.sortType] = clonedSortDirection[this.sortType] === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
		}

		runInAction(() => {
			this.sortDirections = clonedSortDirection
		})
	}

	get dsDistKeys() {
		if (this.sortType) {
			return orderBy(Object.keys(get(this.dirinfo, 'ds-dict', {})), (i) => i, this.sortDirections[this.sortType].toLocaleLowerCase() as 'asc' | 'desc')
		}

		return Object.keys(get(this.dirinfo, 'ds-dict', {}))
	}


	async fetchDirInfo() {
		const response = await fetch(getApiUrl('dirinfo'))
		const res = await response.json()

		
		runInAction(() => {
			this.dirinfo = res
		})
	}

	async fetchDsinfo(name: string) {
		const response = await fetch(getApiUrl(`dsinfo?ds=${name}`), {
			method: 'POST'
		})
		const result = await response.json()

		runInAction(() => {
			this.dsinfo = result
		})
	}
}

export default new DirInfoStore()