import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/variant'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'

export const IgvButton = observer(
  (): ReactElement => {
    const variant = toJS(variantStore.variant)

    const sampleList: [string, string][] = get(variant, '[2].rows[0].cells', [])

    sampleList.shift()

    const fixedSampleList = sampleList.map(element => {
      const sample = element[0]
      const splittedSample = sample.split(': ')
      const sampleName = splittedSample[1]

      return sampleName
    })

    const locus: string = get(variant, '[0].rows[2].cells[0][0]', '')

    const fixedLocus = locus.split(' ')[0]

    return (
      <Link
        target="_blank"
        to={`${Routes.IGV}?locus=${fixedLocus}&names=${fixedSampleList}`}
      >
        <Button
          className="mx-2 whitespace-nowrap"
          text={t('igv.openIgv')}
          size="sm"
        />
      </Link>
    )
  },
)
