import { ICodeFrags, IDtreeSetPoint } from '@service-providers/decision-trees'

export const createCodeFrags = (points: IDtreeSetPoint[]): ICodeFrags[] => {
  const codeFrags: ICodeFrags[] = []

  points.forEach(
    (point, index) =>
      point.kind === 'If' &&
      codeFrags.push({
        condition: point['code-frag'],
        result: points[index + 1]?.['code-frag'],
        decision: points[index + 1]?.decision,
      }),
  )

  return codeFrags
}
