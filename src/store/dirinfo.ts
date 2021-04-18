import { makeAutoObservable } from 'mobx'
import { getApiUrl } from '../core/get-api-url'

class DirInfoStore {
	dirinfo = {}

	constructor() {
		makeAutoObservable(this)
	}

	async fetchDirInfo() {
		const response = await fetch(getApiUrl('dirinfo'))
		const res = await response.json()

		this.dirinfo = res
	}
}

export default new DirInfoStore()