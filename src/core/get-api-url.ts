import {join} from 'path'
// import { BASE_DEMO_API_URL } from '../config/default'

export const getApiUrl = (url: string): string => {
	return join(url)
}