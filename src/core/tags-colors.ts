import md5 from 'md5'

export const tagsColors = [
  '#8FD6F8',
  '#FDD500',
  '#B6D6BA',
  '#A6ADAF',
  '#0C65FD',
  '#F0F0F0',
  '#27B724',
]

export function generateTagColor(value: string): string {
  const hash = md5(value)
  const hex = '#' + hash.slice(0, 6)

  return hex
}
