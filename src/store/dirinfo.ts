import orderBy from 'lodash/orderBy'
import get from 'lodash/get'
import { makeAutoObservable, runInAction } from 'mobx'
import { ANYType, DirInfoType, DsDistItem, DsInfoType } from '../..'
import { SortDatasets } from '../core/enum/sort-datasets.enum'
import { getApiUrl } from '../core/get-api-url'
import { SortDirection } from '../core/sort-direction.enum'
import { cloneDeep } from 'lodash'

type SortDirectionsType = Record<SortDatasets, SortDirection>

class DirInfoStore {
	dirinfo: DirInfoType = {}
	selectedDirinfoName = ''
	dsinfo: DsInfoType = {}
	sortType: SortDatasets | undefined
	filterValue = ''
	sortDirections: SortDirectionsType = {
		[SortDatasets.Name]: SortDirection.ASC,
		[SortDatasets.CreatedAt]: SortDirection.ASC
	}
	infoFrameLink = ''
	activeInfoName = ''

	constructor() {
		makeAutoObservable(this)
	}

	setActiveInfoName (name: string) {
		this.activeInfoName = name
	}
	
	setSelectedDirinfoName(name: string) {
		this.selectedDirinfoName = name
	}

	setInfoFrameLink(link: string) {
		this.infoFrameLink = link
	}

	setSortType(sortType?: SortDatasets) {
		this.sortType = sortType
	}
	
	setFilterValue (value: string) {
		this.filterValue = value
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

	setDsInfo(dsinfo: DsDistItem) {
		this.dsinfo = dsinfo as ANYType
	}

	get dsDistKeys() {
		let keys = Object.keys(get(this.dirinfo, 'ds-dict', {}))

		if (this.filterValue) {
			keys = keys.filter((key) => key.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase()))
		}

		if (this.sortType) {
			return orderBy(keys, (i) => i, this.sortDirections[this.sortType].toLocaleLowerCase() as 'asc' | 'desc')
		}

		return keys
	}

	get ancestorsDsInfo () {
		const ancestors: ANYType[] = get(this, 'dsinfo.ancestors', [])
		const clonedAncestors = cloneDeep(ancestors)

		if (clonedAncestors[0] && clonedAncestors[0][1] && clonedAncestors[0][1][1]) {
			const formatedData = clonedAncestors[0][1][1].map((item: ANYType) => {
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