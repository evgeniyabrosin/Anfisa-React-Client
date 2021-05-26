import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Tags } from '@ui/tags'
import { BaseInfo } from './base-info'
import { NoteInput } from './note-input'

const Root = styled(Box)`
  display: flex;
`

export const HeaderBaseInfo = (): ReactElement => {
  return (
    <Root>
      <BaseInfo />

      <Tags
        tags={['Previously Triaged', 'Benign/Likely benign', 'To follow up']}
      />

      <NoteInput />
    </Root>
  )
}
