import { makeAutoObservable, runInAction } from 'mobx'
import { DirInfoType, DsInfoType } from '../..'
import { getApiUrl } from '../core/get-api-url'

class DirInfoStore {
	dirinfo: DirInfoType = {}
	selectedDirinfoName = ''
	dsinfo: DsInfoType = {}

	constructor() {
		makeAutoObservable(this)
	}

	setSelectedDirinfoName(name: string) {
		this.selectedDirinfoName = name
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