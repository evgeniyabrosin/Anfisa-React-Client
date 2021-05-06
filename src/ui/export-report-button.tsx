import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../i18n/i18n'
import { Button } from './button'
import { DownloadSvg } from './icons/download'

interface Props {
    className?: string
    onClick?: () => void
}

const StyledButton = styled(Button)`
    background-color: white;
    font-family: 'Source Sans Pro', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #0B5FFF;
    border: 1px solid #0B5FFF;
    border-radius: 24px;
    height: 32px;
`

export const ExportReportButton = ({...rest}: Props): ReactElement => {
	return (
		<StyledButton text={t('general.exportReport')} leftIcon={<DownloadSvg style={{ marginRight: 7 }}  {...rest} />} onClick={rest.onClick}/>
	)
}