import 'react-dropdown/style.css'

import { ReactElement } from 'react'
import DropdownBase, { Option } from 'react-dropdown'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterList } from '@declarations'
import datasetStore from '@store/dataset'

const StyledDropDown = styled(DropdownBase)`
  .controlClassName {
    border: none;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #367bf5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0;
    cursor: pointer;

    :hover {
      box-shadow: none;
    }
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

  .menuClassName {
    width: auto;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 8px;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      background: white;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .Dropdown-option {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    color: #262626;
    padding-top: 10px;
    padding-bottom: 10px;

    :hover {
      background-color: #def1fd;
    }
  }

  .Dropdown-option.is-selected {
    color: #367bf5;
    background-color: white;
  }
`

export const DropDown = observer(
  (): ReactElement => {
    const presets: string[] = get(datasetStore, 'dsStat.filter-list', []).map(
      (preset: FilterList) => preset.name,
    )

    const onSelect = (arg: Option) => {
      datasetStore.setActivePreset(arg.value)
      datasetStore.fetchDsTaskIdAsync({ filter: arg.value })
    }

    return (
      <StyledDropDown
        options={presets}
        onChange={onSelect}
        placeholder="Select an option"
        controlClassName="controlClassName"
        arrowClassName="arrowClassName"
        className="rootDropDown"
        placeholderClassName="placeholderClassName"
        menuClassName="menuClassName"
      />
    )
  },
)
