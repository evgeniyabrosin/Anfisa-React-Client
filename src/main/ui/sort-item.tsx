import { ReactElement } from 'react'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { SortSvg } from '../../ui/icons/sort'
import styled from 'styled-components'
import { theme } from '../../theme/theme'

interface Props {
    text: string
    direction: 'asc' | 'desc'
}

const Root = styled(Box)`
	display: flex;
	align-items: center;
	margin-top: 8px;
`

const StyledText = styled(Text)`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	color: ${theme('colors.grey.7')};
	margin-bottom: 8px;
	margin-top: 8px;
`

export const SortItem = ({text, direction}: Props): ReactElement => {
	const sortIconTransform = direction === 'asc' ? 'rotate(180deg) scaleX(-1)' : 'none'

	return (
		<Root>
			<StyledText>{text}</StyledText>
			<SortSvg style={{ transform: sortIconTransform, marginLeft: 9 }}/>
		</Root>
	)
}