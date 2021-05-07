import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../ui/box'
import { HeaderBaseInfo } from './ui/header-base-info'
import { TabContent } from './ui/tab-content'
import { Tabs } from './ui/tabs'
import { VariantHeader } from './variant.header'

const Root = styled(Box)`
  padding-top: 60px;
  padding-left: 37px;
`

const Separator = styled(Box)`
  border-bottom: 1px solid #c4c4c4;
  height: 1px;
  width: 1000px;
  margin-top: 40px;
`

export const VariantPage = (): ReactElement => {
  return (
    <Root>
      <VariantHeader />

      <HeaderBaseInfo />

      <Separator />

      <Tabs />

      <TabContent />
    </Root>
  )
}
