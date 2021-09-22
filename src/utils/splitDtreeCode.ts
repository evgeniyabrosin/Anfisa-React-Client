export const splitDtreeCode = (code: string) => {
  const scriptList = code.split('return')

  const data = scriptList.map(element => {
    const reg = /if [(A-Z|]/g

    const lastCommentWord = reg.exec(element)?.[0] ?? ''

    const comment = element.includes('#')
      ? element.slice(element.indexOf('#'), element.indexOf(lastCommentWord))
      : ''

    const changedElement = element.replace(/\r\n|\r|\n/g, ' ')

    const words = changedElement.split(' ')

    const types: string[] = words.filter(
      word => word === 'or' || word === 'and',
    )

    const isNegate = changedElement.includes('if not ')

    return {
      comment,
      types,
      result: false,
      isNegate,
    }
  })

  scriptList.forEach((element, index) => {
    if (element.includes('True')) {
      data[index - 1].result = true
    }
  })

  data.pop()
  data.pop()

  return data
}
