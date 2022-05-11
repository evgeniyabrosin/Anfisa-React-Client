import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import variantStore from '@store/ws/variant'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { IAttributeDescriptors } from '@service-providers/dataset-level/dataset-level.interface'

export const IgvButton = observer((): ReactElement => {
  const variant = toJS(variantStore.variant)

  const sampleList: [string, string][] = get(variant, '[2].rows[0].cells', [])

  sampleList.shift()

  const fixedSampleList = sampleList.map(element => {
    const sample = element[0]
    const splittedSample = sample.split(': ')
    const sampleName = splittedSample[1]

    return sampleName
  })

  const rows: IAttributeDescriptors[] = get(variant, '[0].rows', [])
  const hg38Row = rows.find(element => element.name === 'hg38')
  const locus = hg38Row?.cells[0][0] ?? ''

  const fixedLocus = locus.split(' ')[0]

  const igvUrls = datasetStore.dsInfo['igv-urls'] as string[] | undefined
  const checkedIgvUrls = igvUrls ?? []
  const stringifiedIgvUrls = JSON.stringify(checkedIgvUrls)

  return (
    <Link
      target="_blank"
      to={`${Routes.IGV}?locus=${fixedLocus}&names=${fixedSampleList}&igvUrls=${stringifiedIgvUrls}`}
    >
      <Button
        className="mx-8 whitespace-nowrap"
        text={t('igv.openIgv')}
        size="sm"
      />
    </Link>
  )
})
