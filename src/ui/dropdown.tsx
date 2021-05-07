import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import DropdownBase, { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import styled from 'styled-components'
import datasetStore from '../store/dataset'

const StyledDropDown = styled(DropdownBase)`
    .controlClassName {
        border: none;
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 24px;
        letter-spacing: 0.44px;
        color: #367BF5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 0;
    }

    .placeholderClassName {
        max-width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 120px;
    }

    .arrowClassName {
        margin-top: auto;
        display: flex;
        align-items: center;
        align-self: center;
    }
`

export const DropDown = observer((): ReactElement => {
	const presets: string[] = get(datasetStore, 'wsTags.filters', []).map((preset: string) => preset.substring(1))
	const defaultOption = presets[0]



	const onSelect = (arg: Option) => {
		datasetStore.setActivePreset(arg.value)
	}


	return (
		<StyledDropDown options={presets} onChange={onSelect} value={defaultOption} placeholder="Select an option" controlClassName="controlClassName" arrowClassName="arrowClassName" className="rootDropDown" placeholderClassName="placeholderClassName" menuClassName="menuClassName" />
	)
})