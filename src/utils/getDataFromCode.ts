export const getDataFromCode = (code: string) => {
  const scriptList = code.split('return')

  const data = scriptList.map(element => {
    const startCondition = /if [(A-Z|]/g

    const lastCommentWord = startCondition.exec(element)?.[0] ?? ''

    const comment = element.includes('#')
      ? element.slice(element.indexOf('#'), element.indexOf(lastCommentWord))
      : ''

    const fullCondition = /((\r\n|\r|\n)|^)if( not | )[\w(|](.|\r\n|\r|\n)+/

    const condition = fullCondition.exec(element)?.[0] ?? ''

    const changedElement = element
      .replace(/\r\n|\r|\n/g, ' ')
      .replace(/"([^"]*)"/g, '')

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
      condition,
    }
  })

  scriptList.forEach((element, index) => {
    const fixedElement = element.replace(/{.+}/, '')

    if (fixedElement.includes('True') && data[index - 1]) {
      data[index - 1].result = true
    }
  })

  data.pop()

  return data
}
