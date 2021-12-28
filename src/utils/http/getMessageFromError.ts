export interface IErrorResponse {
  status: number
  error: string
  message: string
  context: string
  traceback: string
  assertion: string
}

const getValueFromString = (line: string) => {
  const [, ...extract] = line.split(':')

  return extract.join(':')
}

const getTraceBack = (linesArray: string[]): string => {
  const [startIndex, endIndex] = linesArray.reduce(
    (acc, line, idx) => {
      if (line.toLowerCase().startsWith('traceback')) {
        acc[0] = idx + 1
      }

      if (idx > acc[0] && !line.startsWith(' ')) {
        acc[1] = idx - 1
      }

      return acc
    },
    [0, 0],
  )

  return linesArray.slice(startIndex, endIndex).join('\n')
}

export const getMessageFromError = (errorText: string, status: number) => {
  const splitted = errorText.split('\n')

  const error = splitted.reduce((acc, line, idx) => {
    if (!line) return acc

    if (idx === 0) acc.error = line

    const lower = line.toLowerCase()

    if (lower.startsWith(' error')) {
      acc.message = getValueFromString(line).trim()
    }

    if (lower.startsWith(' in context')) {
      acc.context = getValueFromString(line).trim()
    }

    if (lower.startsWith('traceback')) {
      acc.traceback = getTraceBack(splitted)
    }

    if (lower.startsWith('assertionerror')) {
      acc.assertion = getValueFromString(line).trim()
    }

    return acc
  }, {} as IErrorResponse)

  error.status = status

  return error
}
