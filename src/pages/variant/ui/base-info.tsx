import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import variantStore from '@store/variant'
import { Box } from '@ui/box'
import { BaseInfoItem } from './base-info-item'

const Root = styled(Box)`
  padding-right: 150px;
`

export const BaseInfo = observer(
  (): ReactElement => {
    const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
    const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')

    const worstAnnotation = get(
      variantStore,
      'variant[0].rows[3].cells[0][0]',
      '',
    )

    return (
      <Root>
        <BaseInfoItem name={t('variant.genes')} value={genInfo} />
        <BaseInfoItem
          name={t('variant.worstAnnotation')}
          value={worstAnnotation}
        />
        <BaseInfoItem name={t('variant.hg19')} value={hg19} />
      </Root>
    )
  },
)
