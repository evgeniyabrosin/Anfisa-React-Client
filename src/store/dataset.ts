import { makeAutoObservable, runInAction } from 'mobx'
import { DsStatType, TabReportType, WsListType } from '../..'
import { getApiUrl } from '../core/get-api-url'


class DatasetStore {
	dsStat: DsStatType = {}
	wsList: WsListType = {}
	reccnt: any = []
	tabReport: TabReportType[] = []

	isLoadingTabReport = false
	isLoadingDsStat = false

	constructor () {
		makeAutoObservable(this)
	}

	async fetchDsStat(dsName: string | null) {
		this.isLoadingDsStat = true

		const response = await fetch(getApiUrl(`ds_stat?ds=${dsName}`), {
			method: 'POST'
		})
		const result = await response.json()

		runInAction(() => {
			this.dsStat = result
		})
		this.isLoadingDsStat = false
	}

	async fetchWsList(dsName: string | null) {
		const response = await fetch(getApiUrl('ws_list'), {
			method: 'POST',
			body: JSON.stringify({ds: dsName})
		})

		const result = await response.json()

		runInAction(() => {
			this.wsList = result
		})
	}

	async fetchReccnt(dsName: string | null) {
		const response = await fetch(getApiUrl(`reccnt?ds=${dsName}&rec=${11}`))
		const result = await response.json()

		runInAction(() => {
			this.reccnt = result
		})
	}

	async fetchTabReport (dsName: string | null) {
		this.isLoadingTabReport = true

		const seq = Array.from(Array(10).keys())

		const response = await fetch(getApiUrl(`tab_report?ds=${dsName}&schema=xbr&seq=${encodeURIComponent(JSON.stringify(seq))}`))
		const result = await response.json()

		runInAction(() => {
			this.tabReport = result
		})

		this.isLoadingTabReport = false
	}
}

export default new DatasetStore()