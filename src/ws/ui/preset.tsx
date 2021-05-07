import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { DownArray } from '../../ui/icons/down-array'
import { EditFilter } from './edit-filter'
import datasetStore from '../../store/dataset'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import { DropDown } from '../../ui/dropdown'


const Root = styled(Box)` 
    

    
`

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
    color: #367BF5;
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


export const Preset = observer((): ReactElement => {
    // const presets: string[] = get(datasetStore, 'wsTags.filters', [])

    return (
        <Root>
            <Title>{t('ds.preset')}</Title>

            <PresetSelect>
                {/* {presetsName[0] && <StyledPresetName>{presetsName[0].substring(1)}</StyledPresetName>} */}
                {/* <DownArray /> */}
                <DropDown />
            </PresetSelect>

            <EditFilter />

            <ResultsFound>{t('ds.resultsFound', {
                0: datasetStore.tabReport.length
            })}</ResultsFound>
        </Root>
    )
})