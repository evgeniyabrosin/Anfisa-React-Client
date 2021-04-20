import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../i18n/i18n'
import { Box } from '../ui/box'
import { HomeSvg } from '../ui/icons/home'
import { Text } from '../ui/text'
import { theme } from '../theme/theme'
import { useParams } from '../core/hooks/use-params'
import { Variants } from './ui/variants'

const Root = styled(Box)`
    display: flex;
    flex-wrap: wrap;
`

const AnfisaHomeBox = styled(Box)`
    display: flex;
    align-items: center;
`

const AnfisaHome = styled(Text)`
	font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    color: #0C65FD;
    margin-left: 6px;
    margin-top: 21px;
`

const StyledDS = styled(AnfisaHome)`
    color: ${theme('colors.black')};
`

export const WsHeader = (): ReactElement => {
	const params = useParams()
    
	return (
		<Root>
			<AnfisaHomeBox>
				<HomeSvg />
				<AnfisaHome>{t('general.anfisa')}</AnfisaHome>
			</AnfisaHomeBox>
			<StyledDS>{`/ ${params.get('ds')}`}</StyledDS>

			<Variants />
		</Root>
	)
}