import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

interface Props {
    text: string
    color?: string
}

const Root = styled(Box)`
	background: #8FD6F8;
	border-radius: 7px;
	padding: 1px 11px;
`

const StyledText = styled(Text)`
	margin: 0;
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: bold;
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 0.44px;
	color: #000000;
`

export const Tag = ({text, color = '#8FD6F8'}: Props): ReactElement => {
	return (
		<Root style={{backgroundColor: color}}>
			<StyledText>{text}</StyledText>
		</Root>
	)
}