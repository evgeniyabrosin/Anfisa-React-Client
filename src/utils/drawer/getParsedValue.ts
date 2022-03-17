export const getParsedValue = (value: string): string => {
  if (!value.includes('"')) return value

  const splitValueArray: string[] = value.split('')

  const splitValueWithBackSlashArray = splitValueArray.map((letter, index) => {
    return letter === '"' ? (splitValueArray[index] = `\\${letter}`) : letter
  })

  return splitValueWithBackSlashArray.join('')
}
