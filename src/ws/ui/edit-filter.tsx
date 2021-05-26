import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { useParams } from '../../core/hooks/use-params'
import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '../../ui/button'

const StyledButton = styled(Button)`
  background-color: #2183df;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  color: #ffffff;
  width: 80px;
  height: 25px;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const EditFilter = (): ReactElement => {
  const histroy = useHistory()
  const params = useParams()

  const handleClick = () => {
    histroy.push(`${Routes.Filter}?ds=${params.get('ds')}`)
  }

  return <StyledButton text={t('ds.editFilters')} onClick={handleClick} />
}
