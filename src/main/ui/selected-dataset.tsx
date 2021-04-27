import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import dirinfoStore  from '../../store/dirinfo'
import { Button } from '../../ui/button'
import { NextArrowSvg } from '../../ui/icons/next-arrow'
import { t } from '../../i18n/i18n'
import { theme } from '../../theme/theme'
import { DatasetGeneral } from './dataset-general'
import { useHistory } from 'react-router'
import { DatasetsFieldsList } from './dataset-fileds-list'

const Root = styled(Box)`
    padding: 16px;
    margin-left: 24px;
    display: flex;
`
const Wrapper = styled(Box)`
	width: 420px;
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
	const history = useHistory()

	if (!dirinfoStore.selectedDirinfoName) {
		return <></>
	}

	const handleNavigate = (): void => {
		history.push(`/ws?ds=${dirinfoStore.selectedDirinfoName}`)
	}
    
	return (
		<Root>
			<Wrapper>
				<StyledName>{dirinfoStore.selectedDirinfoName}</StyledName>
				<StyledButton text={t('home.openInViewer')} icon={<NextArrowSvg />} onClick={handleNavigate} />

				<DatasetGeneral />
			</Wrapper>

			<DatasetsFieldsList />
		</Root>
	)
})