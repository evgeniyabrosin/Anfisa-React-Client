import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { Box } from './box'
import { Tag } from './tag'
import { Text } from './text'

interface Props {
  tags: string[]
}

const Root = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  max-width: 350px;
  max-height: 135px;
`

const Title = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #000000;
  width: 100%;
  margin: 0px;
`

export const Tags = ({ tags }: Props): ReactElement => (
  <Root>
    <Title>{`${t('general.tags')}:`}</Title>

    {tags.map(tag => (
      <Tag text={tag} key={tag} removeTag={() => datasetStore.removeTag(tag)} />
    ))}
  </Root>
)
