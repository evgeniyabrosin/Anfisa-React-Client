import { makeAutoObservable } from 'mobx'

class VariantStore {
	activeTab = 'Overview'

	constructor() {
		makeAutoObservable(this)
	}

	setActiveTab(name: string) {
		this.activeTab = name
	}

}

export default new VariantStore()