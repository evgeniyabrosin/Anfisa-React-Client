import { TFilteringStatCounts, TItemsCount } from './common.interface'

export const adaptFilteringStatsCounts = (
  counts: TItemsCount,
): TFilteringStatCounts => {
  return {
    variants: counts[0],
    transcribedVariants: counts[1] ?? null,
    transcripts: counts[2] ?? null,
  }
}
