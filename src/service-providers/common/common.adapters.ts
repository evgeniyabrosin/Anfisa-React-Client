import { TFilteringStatCounts, TItemsCount } from './common.interface'

export const adaptFilteringStatsCounts = (
  counts: TItemsCount,
): TFilteringStatCounts => {
  return {
    variants: counts[0],
    transcribedVariants: counts[1],
    transcripts: counts[2],
  }
}
