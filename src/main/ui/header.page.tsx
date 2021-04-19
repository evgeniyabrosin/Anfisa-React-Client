import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../../i18n/i18n'
import { theme } from '../../theme/theme'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import dirinfoStore from '../../store/dirinfo'
import { observer } from 'mobx-react-lite'

const Root = styled('div')`
    display: flex;
    justify-content: space-between;
`

const RouteTitle = styled(Box)`
	display: flex;
	font-family: 'Work Sans', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 23px;
	color: ${theme('colors.blue.0')};
`

const HomeTextStyled = styled(Text)`
	color: ${theme('colors.black')};
`

const AnfisaStyledText = styled(Text)`
	cursor: pointer;
`

const SystemVersion = styled(Text)`
	font-family: 'Lato', sans-serif;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 17px;
`

export const HeaderPage = observer((): ReactElement => {


	return (
		<Root>
			<RouteTitle>
				<AnfisaStyledText>{`${t('general.anfisa')} v6 /`}</AnfisaStyledText>
				<HomeTextStyled style={{marginLeft: '5px' }}>{t('home.title')}</HomeTextStyled>
			</RouteTitle>

			<SystemVersion>
				{t('home.version', {
					0: dirinfoStore.dirinfo.version
				})}
			</SystemVersion>
		</Root>
	)
})