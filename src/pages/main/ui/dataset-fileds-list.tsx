import { Fragment, ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Versions } from '@declarations'
import { t } from '@i18n'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { Card } from '@ui/card'
import { DatasetField } from './dataset-filed'

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 418px;
`

const StyledText = styled(Box)`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${theme('colors.grey.1')};
  margin-bottom: 16px;
`

export const DatasetsFieldsList = observer(
  (): ReactElement => {
    const versions: Versions = get(dirinfoStore, 'dsinfo.meta.versions')

    if (!versions) {
      return <Fragment />
    }

    return (
      <Card>
        <StyledText>{t('home.info')}</StyledText>

        <Wrapper>
          <DatasetField label="GERP" value={versions.GERP} />
          <DatasetField label="Annotations" value={versions.annotations} />
          <DatasetField
            label="Annotations Date"
            value={versions.annotations_date}
          />
          <DatasetField
            label="Annotations build"
            value={versions.annotations_build}
          />
          <DatasetField
            label="bcftools_annotate_version"
            value={versions.bcftools_annotate_version}
            style={{ flexBasis: '100%' }}
          />
          <DatasetField label="gatk" value={versions.gatk} />
          <DatasetField
            label="gatk_select_variants"
            value={versions.gatk_select_variants}
          />
          <DatasetField label="Pipeline" value={versions.pipeline} />
        </Wrapper>
      </Card>
    )
  },
)
