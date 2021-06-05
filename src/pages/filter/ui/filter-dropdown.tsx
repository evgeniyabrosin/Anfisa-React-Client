import 'react-dropdown/style.css'

import { ReactElement } from 'react'
import DropdownBase, { Option } from 'react-dropdown'
import styled from 'styled-components'

interface Props {
  options: string[] | { label: string; value: string }[]
  onChange: (arg: Option) => void
  value?: string
  placeholder?: string
}

const StyledDropDown = styled(DropdownBase)`
  margin-left: 17px;

  .controlClassName {
    width: 142px;
    border: 1px solid #d9d9d9;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.44px;
    color: #262626;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 8px;
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
    background-color: white;
    width: 142px;
    border-radius: 4px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

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
    font-size: 14px;
    line-height: 22px;
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

export const FilterDropdown = ({
  options,
  value,
  placeholder,
  onChange,
}: Props): ReactElement => (
  <StyledDropDown
    options={options}
    onChange={onChange}
    value={value}
    placeholder={placeholder || 'Select an option'}
    controlClassName="controlClassName"
    arrowClassName="arrowClassName"
    className="rootDropDown"
    placeholderClassName="placeholderClassName"
    menuClassName="menuClassName"
  />
)
