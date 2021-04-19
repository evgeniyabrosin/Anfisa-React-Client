import { get } from 'lodash'
import { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'
import { DsDistItem } from '../../..'
import { theme } from '../../theme/theme'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import dirinfoStore from '../../store/dirinfo'
import { DatasetType } from './dataset-type'

interface Props {
    item: DsDistItem
}

interface RootProps {
    onClick?: () => void
    isActive?: boolean
}

const Root = styled(Box)<RootProps>`
	display: flex;
	align-items: center;
	cursor: pointer;
	flex-wrap: wrap;

    ${ifProp('isActive', css`
		background-color: #DEF1FD;
	`)}
`

const StyledName = styled(Text)<{isActive?: boolean}>`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	color: ${theme('colors.black')};
	margin-left: 10px;

	${ifProp('isActive', css`
		font-weight: bold;
	`)}
`

const StyledDate = styled(Text)`
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 16px;
	margin-left: auto;
	color: ${theme('colors.grey.7')};
`

const SubRoot = styled(Box)`
	display: flex;
	align-items: center;
	margin-left: 16px;
`

const DropdownFolder = styled(Box)`
	margin-left: 10px;
`


export const DatasetsListItem = ({item}: Props): ReactElement => {
	const [isActive, setIsActive] = useState(false)
	const [isOpenFolder, setIsOpenFolder] = useState(false)
	const isXl = item.kind === 'xl'
	const secondaryKeys: string[] = get(item, 'secondary', [])
    
	const handleClick = () => {
		if (isXl) {
			setIsOpenFolder((prev) => !prev)
		} 
		setIsActive(true)
	}

	return (
		<Root key={item.name} onClick={handleClick} isActive={isActive}>
			<DatasetType kind={item.kind} isActive={isActive}/>
			<StyledName isActive={isActive}>{item.name}</StyledName>
			<StyledDate >{item['upd-time'] || 'Dec.01, 2020, 06:01'}</StyledDate>

			{isOpenFolder && isXl && (
				<DropdownFolder style={{borderLeft: '1px solid #F0F0F0'}}>
					{secondaryKeys.map((secondaryKey: string) => {
						const secondaryItem: DsDistItem = dirinfoStore.dirinfo['ds-dict'][secondaryKey]

						return (
							<SubRoot key={secondaryItem.name}>
								<DatasetType kind={secondaryItem.kind} />
								<StyledName>{secondaryItem.name}</StyledName>
								<StyledDate>{secondaryItem['upd-time'] || 'Dec.01, 2020, 06:01'}</StyledDate>
							</SubRoot>
						)
					})}
				</DropdownFolder>
			)}
		</Root>
	)
}