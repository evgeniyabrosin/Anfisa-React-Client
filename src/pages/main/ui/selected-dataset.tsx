import { Fragment, ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import dirinfoStore from '@store/dirinfo'
import { NextArrowSvg } from '@icons/next-arrow'
import { Box } from '@ui/box'
import { Button } from '@ui/button'
import { DatasetsFieldsList } from './dataset-fileds-list'
import { DatasetGeneral } from './dataset-general'

const Root = styled(Box)`
  padding: 16px;
  margin-left: 24px;
  display: flex;
`

const Wrapper = styled(Box)`
  width: 420px;
`

const StyledName = styled(Box)`
  margin-bottom: 16px;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${theme('colors.grey.1')};
`

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SelectedDataset = observer(
  (): ReactElement => {
    const history = useHistory()

    if (!dirinfoStore.selectedDirinfoName) {
      return <Fragment />
    }

    const handleNavigate = (): void => {
      history.push(`/ws?ds=${dirinfoStore.selectedDirinfoName}`)
    }

    return (
      <Root>
        <Wrapper>
          <StyledName>{dirinfoStore.selectedDirinfoName}</StyledName>
          <StyledButton
            text={t('home.openInViewer')}
            icon={<NextArrowSvg />}
            onClick={handleNavigate}
          />

          <DatasetGeneral />
        </Wrapper>

        <DatasetsFieldsList />
      </Root>
    )
  },
)
