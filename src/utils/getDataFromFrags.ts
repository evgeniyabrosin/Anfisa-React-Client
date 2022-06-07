import { ICodeFrags } from '@service-providers/decision-trees'

interface IAdaptDataFromFrags {
  condition: string
  result: string | undefined
  decision: boolean | null
  isNegate: boolean
}

export const getDataFromFrags = (
  codeFrags: ICodeFrags[],
): IAdaptDataFromFrags[] => {
  const data = codeFrags.map(codeFrag => {
    const frag = codeFrag.condition.replace(/(<([^>]+)>)/gi, '')

    const isNegate = frag.includes('if not ')

    return {
      condition: codeFrag.condition,
      result: codeFrag.result,
      decision: codeFrag.decision,
      isNegate,
    }
  })

  return data
}
