import { makeAutoObservable, runInAction } from 'mobx'
import { ANYType, DsStatType, TabReportType, WsListType } from '../..'
import { ExportTypeEnum } from '../core/enum/export-type.enum'
import { getApiUrl } from '../core/get-api-url'


class DatasetStore {
	dsStat: DsStatType = {}
	wsList: WsListType = {}
	reccnt: ANYType = []
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

	async exportReportExcel (dsName: string | null, exportType?: ExportTypeEnum) {
		if (exportType === ExportTypeEnum.Excel) {
			const response = await fetch(getApiUrl(`export?ds=${dsName}`), {
				method: 'POST'
			})
	
			const result = await response.json()
			const responseFile = await fetch(getApiUrl(result.fname))
	
			await responseFile.blob().then(blob => {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = `${dsName}.xlsx`
				a.click()
			})
		}

		if (exportType === ExportTypeEnum.CSV) {
			const response = await fetch(getApiUrl(`csv_export?ds=${dsName}&schema=xbr`), {
				method: 'POST'
			})

			await response.blob().then(blob => {
				const url = window.URL.createObjectURL(blob)
				const a = document.createElement('a')
				a.href = url
				a.download = `${dsName}.csv`
				a.click()
			})

		}
	}
}

export default new DatasetStore()