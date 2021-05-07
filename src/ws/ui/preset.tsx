import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import { DownArray } from '../../ui/icons/down-array'
import { Text } from '../../ui/text'
import { EditFilter } from './edit-filter'

const Root = styled(Box)``

const Title = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0px;
`

const PresetSelect = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0px;
  margin-bottom: 5px;
`

const StyledPresetName = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #367bf5;
  margin: 0px;
  margin-right: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 120px;
`

const ResultsFound = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0px;
  margin-top: 4px;
`

export const Preset = (): ReactElement => {
  return (
    <Root>
      <Title>{t('ds.preset')}</Title>

      <PresetSelect>
        <StyledPresetName>SEQaBOO_Hearing.t ex tt extt exttxt</StyledPresetName>
        <DownArray />
      </PresetSelect>

      <EditFilter />

      <ResultsFound>9 results found</ResultsFound>
    </Root>
  )
}
