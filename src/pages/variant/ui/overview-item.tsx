import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { TabContentItem, TabContentItemI } from './tab-content-item'

interface Props {
  title: string
  data: TabContentItemI[]
}

const Root = styled(Box)`
  flex: 50%;
`

const Title = styled(Text)`
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #000000;
  margin-left: 45px;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

const ContainerInfo = styled(Box)`
  background: #e5eef1;
  border-radius: 10px;
  max-width: 358px;
  padding: 10px 36px 10px 36px;
`

export const OverviewItem = ({ title, data }: Props): ReactElement => {
  return (
    <Root>
      <Title>{title}</Title>

      <ContainerInfo>
        {data.map(item => (
          <TabContentItem key={item.name} {...item} />
        ))}
      </ContainerInfo>
    </Root>
  )
}
