import { ReactElement } from 'react'
import SwitchBase from 'react-switch'

import { theme } from '@theme'

interface Props {
  isChecked: boolean
  onChange: (checked: boolean) => void
  size?: 'sm' | 'md'
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
  onChange,
  isChecked,
  size = 'md',
}: Props): ReactElement => (
  <SwitchBase
    onChange={onChange}
    checked={isChecked}
    uncheckedIcon={false}
    checkedIcon={false}
    onColor={theme('colors.blue.bright')}
    offColor={theme('colors.grey.blue')}
    borderRadius={16}
    className="SwitchId"
    height={height[size]}
    handleDiameter={height[size] - 4}
    width={width[size]}
  />
)
