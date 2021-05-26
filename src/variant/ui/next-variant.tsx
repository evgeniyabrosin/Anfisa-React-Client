import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { Button } from '../../ui/button'
import { NextArrowSvg } from '../../ui/icons/next-arrow'

interface Props {
  className?: string
  onClick?: () => void
}

const StyledButton = styled(Button)`
  background-color: white;
  color: #367bf5;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-transform: uppercase;
`

export const NextVariantButton = ({
  className,
  onClick,
}: Props): ReactElement => {
  return (
    <StyledButton
      text={t('variant.next')}
      onClick={onClick}
      icon={<NextArrowSvg fill="#367BF5" />}
      className={className}
    />
  )
}
