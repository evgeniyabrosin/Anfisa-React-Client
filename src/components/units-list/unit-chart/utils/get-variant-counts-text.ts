import { t } from '@i18n'
import { TVariant } from '@service-providers/common'

export const getVariantCountsText = (variant: TVariant): string => {
  const variants = `<div class='font-medium'>${t('filter.chart.variants', {
    value: variant[1],
  })}</div>`

  const transcribedVariants =
    typeof variant[2] === 'number'
      ? `<div class='font-light'>${t('filter.chart.transcribedVariants', {
          value: variant[2],
        })}</div>`
      : ''

  const transcripts =
    typeof variant[3] === 'number'
      ? `<div class='font-light'>${t('filter.chart.transcripts', {
          value: variant[3],
        })}</div>`
      : ''

  return `${variants}${transcribedVariants}${transcripts}`
}
