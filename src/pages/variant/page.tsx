import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { Box } from '@ui/box'
import { VariantHeader } from './header'
import { HeaderBaseInfo } from './ui/header-base-info'
import { TabContent } from './ui/tab-content'
import { Tabs } from './ui/tabs'

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

export const VariantPage = observer(
  (): ReactElement => {
    const location = useLocation()
    const indexVariant = get(location, 'state.index')
    const dsName = get(location, 'state.ds')

    useEffect(() => {
      variantStore.setIndex(indexVariant)
      variantStore.setDsName(dsName)
      variantStore.fetchVarinatInfoAsync()
      datasetStore.setDatasetName(dsName)
    }, [dsName, indexVariant])

    return (
      <Root>
        <VariantHeader />

        <HeaderBaseInfo />

        <Separator />

        <Tabs />

        <TabContent />
      </Root>
    )
  },
)
