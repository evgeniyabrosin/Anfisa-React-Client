import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../i18n/i18n'
import { Tag } from '../ws/ui/tag'
import { Box } from './box'
import { Text } from './text'

interface Props {
    tags: string[]
}

const Root = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	max-width: 350px;
	max-height: 135px;
`

const Title = styled(Text)`
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0.44px;
	color: #000000;
	width: 100%;
	margin: 0px;
`

export const Tags = ({tags}: Props): ReactElement => (
	<Root>
		<Title>{`${t('general.tags')}:`}</Title>

		{tags.map((tag) => {
			return <Tag text={tag} key={tag} />
		})}
	</Root>
)
