import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Tab } from './tab'

const tabsList = ['Overview', 'Transcripts', 'Quality', 'gnomAD', 'Databases', 'Predictions', 'Pharmacogenomics', 'Bioinformatics']

const Root = styled(Box)`
    display: flex;
    margin-top: 20px;
`

export const Tabs = (): ReactElement => (
	<Root>
		{tabsList.map((tab) => <Tab name={tab} key={tab} /> )}
	</Root>
)
