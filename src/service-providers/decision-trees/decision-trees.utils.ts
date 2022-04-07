import { TPropertyStatus } from '../common'

export const getIncompleteProps = (list: TPropertyStatus[]): string[] =>
  list.filter(stat => stat.incomplete).map(stat => stat.name)
