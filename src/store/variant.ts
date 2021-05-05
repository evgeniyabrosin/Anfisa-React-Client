import { makeAutoObservable, runInAction } from 'mobx'
import { ReccntType } from '../..'
import { getApiUrl } from '../core/get-api-url'

class VariantStore {
	variant: ReccntType[] = []
	activeTab = 'Overview'
	index = 0
	dsName = ''

	constructor() {
		makeAutoObservable(this)
	}

	setActiveTab(name: string) {
		this.activeTab = name
	}

	nextVariant() {
		this.index += 1
		this.fetchVarinatInfo()
	}

	setIndex(index: number) {
		this.index = index
	}

	setDsName(dsName: string) {
		this.dsName = dsName
	}

	async fetchVarinatInfo() {
		const response = await fetch(getApiUrl(`reccnt?ds=${this.dsName}&rec=${this.index}`), {
			method: 'POST',
		})

		const result = await response.json()
		console.log(result)
		runInAction(() => {
			this.variant = result
		})
	}
}

export default new VariantStore()