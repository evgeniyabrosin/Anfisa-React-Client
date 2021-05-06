import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { ExportReportButton } from '../../ui/export-report-button'
import { ColumnsControlSvg } from '../../ui/icons/columns-control'
import { ListView } from '../../ui/icons/list-view'
import datasetStore from '../../store/dataset'
import { useParams } from '../../core/hooks/use-params'
import { ExportTypeEnum } from '../../core/enum/export-type.enum'

const Root = styled(Box)`
    display: flex;
    align-items: flex-end;
    margin-left: auto;
`

export const Settings = (): ReactElement => {
	const params = useParams()

	const handleExport = async () => {
		datasetStore.exportReportExcel(params.get('ds'), ExportTypeEnum.Excel)
	}

	return (
		<Root>
			<ColumnsControlSvg />

			<ListView />

			<ExportReportButton onClick={handleExport} />
		</Root>
	)
}