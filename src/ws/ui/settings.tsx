import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { ExportPanel } from '@ui/export-panel'
import { ExportReportButton } from '@ui/export-report-button'
import { Popper } from '@ui/popper'
import { SettingsPanel } from './settings-panel'
import { TableProperiesButton } from './table-properties-button'

const Root = styled(Box)`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`

export const Settings = (): ReactElement => (
  <Root>
    <Popper ButtonElement={TableProperiesButton} ModalElement={SettingsPanel} />

    <Popper ButtonElement={ExportReportButton} ModalElement={ExportPanel} />
  </Root>
)
