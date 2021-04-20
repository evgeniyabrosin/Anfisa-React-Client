import { ReactElement } from 'react'
import styled from 'styled-components'

interface Props {
    text: string
    className?: string
    onClick?: () => void
    icon?: ReactElement
}

const StyledButton = styled('button')`
    background-color: #0C65FD;
    border-radius: 4px;
    border: none;
    font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.04em;
    color: #FFFFFF;
    padding: 8px;
    outline: none;
    cursor: pointer;
`

export const Button = ({text, onClick, className, icon}: Props): ReactElement => {
	return (
		<StyledButton onClick={onClick} className={className}>{text} {icon}</StyledButton>
	)
}