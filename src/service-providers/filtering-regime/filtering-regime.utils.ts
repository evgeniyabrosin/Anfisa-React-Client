import { PointCount } from '@service-providers/decision-trees'
import { TPropertyStatus } from '../common'

export const getIncompleteProps = (list: TPropertyStatus[]): string[] =>
  list.filter(stat => stat.incomplete).map(stat => stat.name)

export const getIncompletePoints = (pointlist: PointCount[]): number[] => {
  const filteredPoints: number[] = []

  pointlist.forEach((point, index) => {
    if (!point) filteredPoints.push(index)
  })

  return filteredPoints
}
