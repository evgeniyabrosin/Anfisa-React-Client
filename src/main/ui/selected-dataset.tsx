import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import dirinfoStore  from '../../store/dirinfo'
import { Button } from '../../ui/button'
import { NextArrowSvg } from '../../ui/icons/next-arrow'
import { DatasetInfo } from './dataset-info'
import { t } from '../../i18n/i18n'
import { theme } from '../../theme/theme'
import { DatasetGeneral } from './dataset-general'

const Root = styled(Box)`
    padding: 16px;
    width: 420px;
    margin-left: 24px;
`

const StyledName = styled(Text)`
    margin-top: 24px;
    margin-bottom: 24px;
    font-family: 'Work Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: ${theme('colors.grey.1')};
`

const StyledButton = styled(Button)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const SelectedDataset = observer((): ReactElement => {
	if (!dirinfoStore.selectedDirinfoName) {
		return <></>
	}

	const handleNavigate = (): void => {
		window.open(`/ws?ds=${dirinfoStore.selectedDirinfoName}`, '_blank')
		window.focus()
	}
    
	return (
		<Root>
			<StyledName>{dirinfoStore.selectedDirinfoName}</StyledName>
			<StyledButton text={t('home.openInViewer')} icon={<NextArrowSvg />} onClick={handleNavigate} />

			<DatasetGeneral />
			{/* <DatasetInfo /> */}
		</Root>
	)
})