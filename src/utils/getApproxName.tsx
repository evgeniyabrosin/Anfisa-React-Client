import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ApproxValueTypes } from '@core/enum/approxValueTypes'

export const getApproxName = (
  approxValue?: ApproxValueTypes,
): ApproxNameTypes => {
  if (approxValue === ApproxValueTypes.Gene) return ApproxNameTypes.Shared_Gene

  if (approxValue === ApproxValueTypes.Rough) {
    return ApproxNameTypes.Non_Intersecting_Transcript
  }

  return ApproxNameTypes.Shared_Transcript
}
