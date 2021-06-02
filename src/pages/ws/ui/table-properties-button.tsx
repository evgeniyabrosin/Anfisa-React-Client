import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { DownArray } from '@icons/down-array'
import { SettingsTableSvg } from '@icons/settings-table'
import { Button } from '@ui/button'

interface Props {
  refEl: any
  isOpen?: boolean
  onClick?: () => void
}

const StyledButton = styled(Button)`
  background: #e6efff;
  border-radius: 20px;
  color: #0c65fd;
  font-weight: bold;
  line-height: 22px;
  padding: 5px 16px;
  margin-right: 24px;
`

export const TableProperiesButton = ({
  refEl,
  isOpen,
  onClick,
}: Props): ReactElement => (
  <StyledButton
    refEl={refEl}
    onClick={onClick}
    text={t('ds.tableProperties')}
    prepend={<SettingsTableSvg style={{ marginRight: 6 }} />}
    append={
      <DownArray
        style={{
          marginLeft: 10,
          transform: isOpen ? 'rotate(180deg)' : 'none',
        }}
      />
    }
  />
)
