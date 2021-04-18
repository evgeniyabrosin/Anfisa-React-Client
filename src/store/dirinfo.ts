import { makeAutoObservable } from 'mobx'
import axios from 'axios'

class DirInfoStore {
dirinfo = {}

constructor() {
	makeAutoObservable(this)
}

async fetchDirInfo() {
	const result = await axios.get('/dirinfo', {
		baseURL: 'http://localhost:9010/anfisa/app',
	})
	console.log(result)

	this.dirinfo = result
}
}

export default new DirInfoStore()