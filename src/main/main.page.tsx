import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'
import { Datasets } from './ui/datasets'
import { HeaderPage } from './ui/header.page'
import { SelectedDataset } from './ui/selected-dataset'

const Root = styled(Box)`
  padding: 32px;
`

const Container = styled(Box)`
  display: flex;
`

export const MainPage = (): ReactElement => {
  useEffect(() => {
    dirinfoStore.fetchDirInfoAsync()
  }, [])

  return (
    <Root>
      <HeaderPage />

      <Container>
        <Datasets />

        <SelectedDataset />
      </Container>
    </Root>
  )
}
