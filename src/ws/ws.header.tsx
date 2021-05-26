import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { useParams } from '../core/hooks/use-params'
import { t } from '../i18n'
import { Routes } from '../router/routes.enum'
import { theme } from '@theme'
import { Box } from '../ui/box'
import { HomeSvg } from '../ui/icons/home'
import { Text } from '../ui/text'
import { Variants } from './ui/variants'

const Root = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`

const AnfisaHomeBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AnfisaHome = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #0c65fd;
  margin-left: 6px;
  margin-top: 21px;
`

const StyledDS = styled(AnfisaHome)`
  color: ${theme('colors.black')};
`

export const WsHeader = (): ReactElement => {
  const params = useParams()
  const history = useHistory()

  const handleMoveHome = () => {
    history.push(Routes.Root)
  }

  return (
    <Root>
      <AnfisaHomeBox onClick={handleMoveHome}>
        <HomeSvg />
        <AnfisaHome>{t('general.anfisa')}</AnfisaHome>
      </AnfisaHomeBox>

      <StyledDS>{`/ ${params.get('ds')}`}</StyledDS>

      <Variants />
    </Root>
  )
}
