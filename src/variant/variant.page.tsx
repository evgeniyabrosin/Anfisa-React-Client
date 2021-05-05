import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { Box } from '../ui/box'
import { HeaderBaseInfo } from './ui/header-base-info'
import { TabContent } from './ui/tab-content'
import { Tabs } from './ui/tabs'
import { VariantHeader } from './variant.header'
import variantStore from '../store/variant'

const Root = styled(Box)`
    padding-top: 60px;
    padding-left: 37px;
`

const Separator = styled(Box)`
	border-bottom: 1px solid #C4C4C4;
	height: 1px;
	width: 1000px;
	margin-top: 40px;
`


export const VariantPage = observer((): ReactElement => {
	const location = useLocation()
	const indexVariant = get(location, 'state.index')
	const dsName = get(location, 'state.ds')

	useEffect(() => {
		variantStore.setIndex(indexVariant)
		variantStore.setDsName(dsName)
		variantStore.fetchVarinatInfo()
	}, [])
	
	return (
		<Root>
			<VariantHeader />

			<HeaderBaseInfo />

			<Separator />

			<Tabs />

			<TabContent />
		</Root>
	)
})