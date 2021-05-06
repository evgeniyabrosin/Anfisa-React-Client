import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { Box } from '../../ui/box'
import variantStore from '../../store/variant'
import { TabOverview } from './tab-overview'

const tabMap: Record<string, ReactElement> = {
	'General': <TabOverview />
}


const renderTab = (key: string) => {
	const Tab = tabMap[key]

	if (!Tab) {
		return <></>
	}

	return Tab
}


export const TabContent = observer((): ReactElement => {
	return (
		<Box>
			{renderTab(variantStore.activeTab)}
		</Box>
	)
})