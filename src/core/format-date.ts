import formatFNS from 'date-fns/format'
import enLocale from 'date-fns/locale/en-US'

export const formatDate = (value: string | Date): string => {
  if (!value) {
    return ''
  }

  const newDate = new Date(value)

  return formatFNS(newDate, 'LLL.dd, Y', {
    locale: enLocale,
  })
}

export const formatTime = (value: string | Date): string => {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })
}
