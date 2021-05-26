import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

const Root = styled(Box)`
  margin-left: 40px;
`

const Title = styled(Text)`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #000000;
`

const StyledTextarea = styled('textarea')`
  background: #f4f6f9;
  border-radius: 8px;
  border: none;
  outline: none;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(9, 16, 29, 0.4);
  padding: 12px 16px;
`

export const NoteInput = (): ReactElement => (
  <Root>
    <Title>{t('variant.noteTitle')}</Title>

    <StyledTextarea placeholder={t('variant.typeNote')} />
  </Root>
)
