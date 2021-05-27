import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import variantStore from '@store/variant'
import { Box } from '@ui/box'
import { TabOverview } from './tab-overview'

const tabMap: Record<string, ReactElement> = {
  General: <TabOverview />,
}

const renderTab = (key: string) => {
  const Tab = tabMap[key]

  if (!Tab) {
    return <Fragment />
  }

  return Tab
}

export const TabContent = observer(
  (): ReactElement => {
    return <Box>{renderTab(variantStore.activeTab)}</Box>
  },
)
