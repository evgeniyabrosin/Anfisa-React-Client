import { ReactElement, useState } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { Switch } from '../../ui/switch'
import { Text } from '../../ui/text'

const Root = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 12px;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: #595959;
  margin: 0px;
  margin-bottom: 3px;
  margin-left: 8px;
`

export const VisualEditorSwitch = (): ReactElement => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <Root>
      <Switch isChecked={isChecked} onChange={setIsChecked} />
      <StyledText>Visual Editor</StyledText>
    </Root>
  )
}
