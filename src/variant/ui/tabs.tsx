import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Tab } from './tab'
import variantStore from '../../store/variant'

const Root = styled(Box)`
    display: flex;
    margin-top: 20px;
	overflow-x: scroll;
	margin-right: 30px;

	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
`


	
export const Tabs = observer((): ReactElement => {
	return (
		<Root>
			{variantStore.getTabs.map((tab) => <Tab name={tab} key={tab} /> )}
		</Root>
	)
})