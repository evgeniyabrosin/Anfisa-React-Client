import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import variantStore from '@store/variant'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

interface Props {
  name: string
}

interface ActiveTabI {
  isActive?: boolean
}

const Root = styled(Box)<ActiveTabI>`
  margin-right: 8px;
  padding: 7px;
  cursor: pointer;

  ${ifProp(
    'isActive',
    css`
      border-bottom: 1px solid #367bf5;
    `,
  )}
`

const TabName = styled(Text)<ActiveTabI>`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #78909c;
  margin: 0px;

  ${ifProp(
    'isActive',
    css`
      color: #367bf5;
    `,
  )}
`

export const Tab = observer(
  ({ name }: Props): ReactElement => {
    const isActive = variantStore.activeTab === name

    const handleClick = () => {
      variantStore.setActiveTab(name)
    }

    return (
      <Root isActive={isActive} onClick={handleClick}>
        <TabName isActive={isActive}>{name}</TabName>
      </Root>
    )
  },
)
