
import formatFNS from 'date-fns/format'
import enLocale from 'date-fns/locale/en-US'

export const formatDate = (value: string | Date): string => {
	if (!value) {
		return ''
	}
	
	const newDate = new Date(value)
	const date = formatFNS(newDate, 'LLL.dd, Y, kk:mm', {
		locale: enLocale
	})

	return date
}