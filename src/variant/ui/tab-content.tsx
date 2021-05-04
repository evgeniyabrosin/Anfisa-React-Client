import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { fakeData } from '../fake-data'
import { TabContentItem } from './tab-content-item'

const Title = styled(Text)`
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #000000;
	margin-left: 45px;
`

const ContainerInfo = styled(Box)`
	background: #E5EEF1;
	border-radius: 10px;
	max-width: 358px;
	padding: 10px 36px 10px 36px;
`

export const TabContent = (): ReactElement => {
	return (
		<Box>
			<Title>General info</Title>

			<ContainerInfo>
				{fakeData.map((item) => <TabContentItem key={item.name} {...item}/>)}
			</ContainerInfo>
		</Box>
	)
}