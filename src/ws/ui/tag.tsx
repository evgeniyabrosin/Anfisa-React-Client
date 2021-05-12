import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { CloseTagSvg } from '../../ui/icons/close-tag'
import { Text } from '../../ui/text'

interface Props {
  text: string
  color?: string
  removeTag?: () => void
}

const Root = styled(Box)`
  background: #8fd6f8;
  border-radius: 7px;
  padding: 1px 11px;
  height: 24px;
  margin-top: 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledText = styled(Text)`
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.44px;
  color: #000000;
  margin-right: 2px;
`

export const Tag = observer(
  ({ text, color = '#8FD6F8', removeTag }: Props): ReactElement => {
    return (
      <Root
        style={{ backgroundColor: datasetStore.tagsColorMap[text] || color }}
      >
        <StyledText>{text}</StyledText>

        <CloseTagSvg onClick={removeTag} />
      </Root>
    )
  },
)
