import 'react-dropdown/style.css'

import { ReactElement } from 'react'
import DropdownBase, { Option } from 'react-dropdown'
import styled from 'styled-components'

import { theme } from '@theme'

export enum DropdownVariantEnum {
  WHITE = 'WHITE',
  DARK = 'DARK',
}

interface Props {
  options: any[]
  dataTestId?: string
  placeholder?: string
  value?: string
  variant?: DropdownVariantEnum
  onSelect: (arg: Option) => void
}

const StyledDropDown = styled(DropdownBase)<{
  variant?: DropdownVariantEnum
}>`
  .controlClassName {
    border: none;
    background-color: ${theme('colors.blue.lighter')};
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    border-radius: 4px;
    width: 192px;
    padding-right: 20px;
    height: 32px;

    :hover {
      box-shadow: none;
    }
  }

  .controlClassName-white {
    background-color: white;
    color: black;
    border: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    border-radius: 4px;
    width: 209px;
    padding-right: 20px;
    font-size: 12px;

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

  .arrowClassName-white {
    top: 45%;
    border-color: grey transparent transparent;
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
  }

  .menuClassName-white {
    border: none;
    border-radius: 4px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 8px;
    background-color: ${theme('color.white')};
    color: black;
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

    .Dropdown-option {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      /* color: white; */
      color: black;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 209px;

      :hover {
        background-color: ${theme('colors.blue.bright')};
        color: ${theme('colors.white')};
      }
    }

    .Dropdown-option.is-selected {
      color: ${theme('colors.white')};
      background-color: ${theme('colors.blue.bright')};
    }
  }
`

const variantClassesMap = {
  [DropdownVariantEnum.WHITE]: {
    controlClassName: 'controlClassName-white',
    arrowClassName: 'arrowClassName-white',
    menuClassName: 'menuClassName-white',
  },
  [DropdownVariantEnum.DARK]: {
    controlClassName: 'controlClassName text-12 leading-14',
    arrowClassName: 'arrowClassName',
    menuClassName: 'menuClassName',
  },
}

export const DropDown = ({
  options,
  value,
  placeholder,
  variant = DropdownVariantEnum.DARK,
  onSelect,
}: Props): ReactElement => (
  <StyledDropDown
    options={options}
    variant={variant}
    value={value}
    onChange={onSelect}
    placeholder={placeholder}
    {...variantClassesMap[variant]}
  />
)
