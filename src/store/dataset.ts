import { makeAutoObservable, runInAction } from 'mobx'
import {  DsStatType } from '../..'
import { getApiUrl } from '../core/get-api-url'


class DatasetStore {
	dsStat: DsStatType = {}

	constructor () {
		makeAutoObservable(this)
	}

	async fetchDsStat(dsName: string | null) {
		const response = await fetch(getApiUrl(`ds_stat?ds=${dsName}`), {
			method: 'POST'
		})
		const result = await response.json()

		runInAction(() => {
			this.dsStat = result
		})
	}
}

export default new DatasetStore()