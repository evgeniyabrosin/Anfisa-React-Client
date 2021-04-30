import { ReactElement } from 'react'
import styled from 'styled-components'
import { Button } from '../../ui/button'

const StyledButton = styled(Button)`
	background-color: #2183DF;
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 24px;
	color: #FFFFFF;
	width: 80px;
	height: 25px;
	align-items: center;
	justify-content: center;
`

export const EditFilter = (): ReactElement => {
	return (
		<StyledButton text="Edit filters" />
	)
}