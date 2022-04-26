import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { ApproxValueTypes } from '@core/enum/approxValueTypes'

export const getApproxValue = (
  approxName: ApproxNameTypes,
): ApproxValueTypes | null => {
  if (approxName === ApproxNameTypes.Non_Intersecting_Transcript) {
    return ApproxValueTypes.Rough
  }

  if (approxName === ApproxNameTypes.Shared_Gene) {
    return ApproxValueTypes.Gene
  }

  return null
}
