import { ReactElement } from 'react'
import SwitchBase from 'react-switch'

import { theme } from '@theme'

interface Props {
  isChecked: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
  onChange: (checked: boolean) => void
}

const height = {
  sm: 12,
  md: 16,
}

const width = {
  sm: 24,
  md: 28,
}

export const Switch = ({
  isChecked,
  disabled,
  size = 'md',
  onChange,
}: Props): ReactElement => (
  <SwitchBase
    onChange={onChange}
    checked={isChecked}
    uncheckedIcon={false}
    checkedIcon={false}
    onColor={theme('colors.blue.bright')}
    offColor={theme('colors.grey.blue')}
    borderRadius={16}
    height={height[size]}
    handleDiameter={height[size] - 4}
    width={width[size]}
    disabled={disabled}
  />
)
