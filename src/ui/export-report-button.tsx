import { ReactElement } from 'react'
import styled from 'styled-components'

import { ANYType } from '../..'
import { t } from '@i18n'
import { Button } from './button'
import { DownArray } from './icons/down-array'
import { DownloadSvg } from './icons/download'

interface Props {
  className?: string
  onClick?: () => void
  refEl: ANYType
  isOpen?: boolean
}

const StyledButton = styled(Button)`
  background-color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #0b5fff;
  border: 1px solid #0b5fff;
  border-radius: 24px;
  height: 32px;
`

export const ExportReportButton = ({
  isOpen,
  refEl,
  ...rest
}: Props): ReactElement => (
  <StyledButton
    text={t('general.exportReport')}
    refEl={refEl}
    leftIcon={<DownloadSvg style={{ marginRight: 7 }} {...rest} />}
    onClick={rest.onClick}
    icon={
      <DownArray
        style={{
          marginLeft: 10,
          transform: isOpen ? 'rotate(180deg)' : 'none',
        }}
      />
    }
  />
)
