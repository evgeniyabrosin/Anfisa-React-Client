import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { theme } from '@theme'
import { Box } from '../../ui/box'

const Root = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`

const RouteTitle = styled(Box)`
  display: flex;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: ${theme('colors.blue.0')};
`

const HomeTextStyled = styled(Box)`
  color: ${theme('colors.black')};
  margin-left: 5px;
`

const AnfisaStyledText = styled(Box)`
  cursor: pointer;
`

const SystemVersion = styled(Box)`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`

export const HeaderPage = observer(
  (): ReactElement => {
    return (
      <Root>
        <RouteTitle>
          <AnfisaStyledText>{`${t('general.anfisa')} v6 /`}</AnfisaStyledText>
          <HomeTextStyled>{t('home.title')}</HomeTextStyled>
        </RouteTitle>

        <SystemVersion>
          {t('home.version', {
            0: dirinfoStore.dirinfo.version,
          })}
        </SystemVersion>
      </Root>
    )
  },
)
