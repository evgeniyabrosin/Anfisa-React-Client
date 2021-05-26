import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '../../i18n'
import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { DropDown } from '../../ui/dropdown'
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

export const Preset = observer(
  (): ReactElement => (
    <Root>
      <Title>{t('ds.preset')}</Title>

      <PresetSelect>
        <DropDown />
      </PresetSelect>

      <EditFilter />

      {(datasetStore.filteredNo.length > 0 || datasetStore.activePreset) && (
        <ResultsFound>
          {t('ds.resultsFound', {
            0: datasetStore.filteredNo.length,
          })}
        </ResultsFound>
      )}
    </Root>
  ),
)
