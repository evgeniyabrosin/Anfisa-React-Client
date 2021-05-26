import get from 'lodash/get'
import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import variantStore from '../../store/variant'
import { Box } from '../../ui/box'
import { OverviewItem } from './overview-item'
import { TabContentItemI } from './tab-content-item'

const Root = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`

export const TabOverview = (): ReactElement => {
  const [generalInfoData, setGeneralInfoData] = useState<TabContentItemI[]>([])
  const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
  const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')

  const worstAnnotation = get(
    variantStore,
    'variant[0].rows[3].cells[0][0]',
    '',
  )

  const canonicalAnnotations = get(
    variantStore,
    'variant[0].rows[4].cells[0][0]',
    '',
  )

  const [transcriptData, setTranscriptData] = useState<TabContentItemI[]>([])

  const [genotypeData, setGenotypeData] = useState<TabContentItemI[]>([])

  useEffect(() => {
    setGeneralInfoData([
      { name: t('variant.genes'), value: genInfo },
      { name: t('variant.worstAnnotation'), value: worstAnnotation },
      { name: t('variant.hg19'), value: hg19 },
      { name: t('variant.canonicalAnnotations'), value: canonicalAnnotations },
    ])

    setTranscriptData([
      { name: t('variant.refSeqCanonical'), value: '' },
      { name: t('variant.refSeqWorst'), value: '' },
      { name: t('variant.ensemblCanonical'), value: '' },
      { name: t('variant.ensemblWorst'), value: '' },
    ])

    setGenotypeData([
      {
        name: t('variant.proband'),
        value: get(variantStore, 'variant[0].rows[14].cells[0][0]'),
      },
      { name: t('variant.maternal'), value: '123' },
      { name: t('variant.paternal'), value: '123' },
    ])
  }, [canonicalAnnotations, genInfo, hg19, worstAnnotation])

  // const testData = get(variantStore, 'variant[0].rows', []) as any[]

  // const formatedData = testData.map(((item) => {
  // 	if (!item) {
  // 		return {name: '', value: ''}
  // 	}

  // 	return ({
  // 		name: item.title,
  // 		value: get(item, 'cells[0][0]', '')
  // 	})
  // }))

  return (
    <Root>
      <OverviewItem title={t('variant.generalInfo')} data={generalInfoData} />

      <OverviewItem title={t('variant.geneAnnotation')} data={[]} />

      <OverviewItem title={t('variant.transcript')} data={transcriptData} />

      <OverviewItem title={t('variant.genotype')} data={genotypeData} />
    </Root>
  )
}
