import { CSSProperties, ReactElement } from 'react'
import SwitchBase from 'react-switch'

import { Box } from './box'

interface Props {
  isChecked: boolean
  onChange: (checked: boolean) => void
  style?: CSSProperties
}

export const Switch = ({ onChange, isChecked, style }: Props): ReactElement => (
  <Box style={style}>
    <SwitchBase
      onChange={onChange}
      checked={isChecked}
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#0C65FD"
      borderRadius={16}
      className="SwitchId"
      height={16}
      width={28}
    />
  </Box>
)
