import { Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Header } from '@components/header'

const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ErrorStatus = styled.h1`
  font-weight: bold;
  font-size: 164px;
  line-height: 180px;
  color: ${theme('colors.grey.disabled')};
`

const Title = styled.h2`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: ${theme('colors.blue.dark')};
`

const Info = styled.span`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${theme('colors.blue.dark')};
  max-width: 426px;
  margin: 16px 0px 20px;
`

export const NotFoundPage = (): ReactElement => {
  return (
    <Fragment>
      <Header />
      <Wrapper>
        <ErrorStatus>404</ErrorStatus>
        <Title>{t('notFound.somethingIsWrong')}</Title>
        <Info>{t('notFound.info')}</Info>
        <Link to={Routes.Root}>
          <Button
            text={t('error.getBack')}
            className="mt-3"
            prepend={<Icon name="Arrow" />}
          />
        </Link>
      </Wrapper>
    </Fragment>
  )
}
