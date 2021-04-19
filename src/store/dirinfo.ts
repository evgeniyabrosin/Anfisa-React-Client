import { makeAutoObservable } from 'mobx'
import { DirInfoType } from '../..'
import { getApiUrl } from '../core/get-api-url'

class DirInfoStore {
	dirinfo: DirInfoType = {}
	selectedDirinfoName = ''

	constructor() {
		makeAutoObservable(this)
	}

	async fetchDirInfo() {
		const response = await fetch(getApiUrl('dirinfo'))
		const res = await response.json()

		this.dirinfo = res
	}

	setSelectedDirinfoName(name: string) {
		this.selectedDirinfoName = name
	}
}

export default new DirInfoStore()