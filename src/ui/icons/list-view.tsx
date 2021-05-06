


import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../box'

interface Props {
    onClick?: () => void
}

const Root = styled(Box)`
    background: #E6EFFF;
    border-radius: 10px;
    display: flex;
    padding: 6px;
    align-items: center;
	height: 24px;
	margin-left: 10px;
	margin-right: 15px;
`

export const ListView = ({onClick}: Props): ReactElement => {
	return (
		<Root onClick={onClick}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5 12H8C8.55 12 9 11.55 9 11V7C9 6.45 8.55 6 8 6H5C4.45 6 4 6.45 4 7V11C4 11.55 4.45 12 5 12ZM5 19H8C8.55 19 9 18.55 9 18V14C9 13.45 8.55 13 8 13H5C4.45 13 4 13.45 4 14V18C4 18.55 4.45 19 5 19ZM11 19H14C14.55 19 15 18.55 15 18V14C15 13.45 14.55 13 14 13H11C10.45 13 10 13.45 10 14V18C10 18.55 10.45 19 11 19ZM17 19H20C20.55 19 21 18.55 21 18V14C21 13.45 20.55 13 20 13H17C16.45 13 16 13.45 16 14V18C16 18.55 16.45 19 17 19ZM11 12H14C14.55 12 15 11.55 15 11V7C15 6.45 14.55 6 14 6H11C10.45 6 10 6.45 10 7V11C10 11.55 10.45 12 11 12ZM16 7V11C16 11.55 16.45 12 17 12H20C20.55 12 21 11.55 21 11V7C21 6.45 20.55 6 20 6H17C16.45 6 16 6.45 16 7Z" fill="#0C65FD"/>
			</svg>

            
			<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.416748 0.249999L5.00008 4.83333L9.58341 0.249999L0.416748 0.249999Z" fill="#78909C"/>
			</svg>
		</Root>
	)
}