import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { Fragment, ReactElement } from 'react'
import styled from 'styled-components'

import { Versions } from '../../..'
import { t } from '../../i18n'
import dirinfoStore from '../../store/dirinfo'
import { theme } from '@theme'
import { Box } from '../../ui/box'
import { DatasetField } from './dataset-filed'

const Root = styled(Box)`
  margin-left: 24px;
  padding-left: 16px;
  box-sizing: border-box;
`

const Wrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 418px;
`

const StyledText = styled(Box)`
  font-family: 'Work Sans', sans-serif;
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
      <Root>
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
      </Root>
    )
  },
)
