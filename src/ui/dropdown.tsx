import 'react-dropdown/style.css'

import { ReactElement } from 'react'
import DropdownBase, { Option } from 'react-dropdown'
import styled from 'styled-components'

import { theme } from '@theme'

interface Props {
  options: any[]
  placeholder?: string
  value?: string
  onSelect: (arg: Option) => void
}

const StyledDropDown = styled(DropdownBase)`
  .controlClassName {
    border: none;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0.44px;
    background-color: ${theme('colors.blue.lighter')};
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    border-radius: 4px;
    width: 209px;
    padding-right: 20px;

    :hover {
      box-shadow: none;
    }
  }

  .placeholderClassName {
    max-width: 209px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 120px;
  }

  .arrowClassName {
    top: 45%;
    border-color: white transparent transparent;
  }

  .menuClassName {
    border: none;
    border-radius: 4px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 8px;
    background-color: ${theme('colors.blue.lighter')};
    color: white;
    overflow-x: hidden;
    max-height: 300px;

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
    line-height: 14px;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 209px;

    :hover {
      background-color: ${theme('colors.blue.secondary')};
    }
  }

  .Dropdown-option.is-selected {
    color: white;
    background-color: ${theme('colors.blue.secondary')};
  }
`

export const DropDown = ({
  options,
  value,
  placeholder,
  onSelect,
}: Props): ReactElement => (
  <StyledDropDown
    options={options}
    value={value}
    onChange={onSelect}
    placeholder={placeholder}
    controlClassName="controlClassName"
    arrowClassName="arrowClassName"
    className="rootDropDown"
    placeholderClassName="placeholderClassName"
    menuClassName="menuClassName"
  />
)
