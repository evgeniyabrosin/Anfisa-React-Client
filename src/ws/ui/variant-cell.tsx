import get from 'lodash/get'
import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { copyToClipboard } from '../../core/copy-to-clipboard'
import { getVariantColor } from '../../core/get-variant-color'
import { useParams } from '../../core/hooks/use-params'
import { t } from '../../i18n'
import { Routes } from '../../router/routes.enum'
import { theme } from '../../theme'
import { Box } from '../../ui/box'
import { ShareSvg } from '../../ui/icons/share'
import { TableDocSvg } from '../../ui/icons/table-doc'
import { Text } from '../../ui/text'

export interface CellI {
  cell: {
    value: string
  }
}

const Root = styled(Box)`
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 20px;
  width: 150px;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${theme('colors.black')};
  margin: 5px 0px;
`

const Circle = styled(Box)`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50px;
  margin-right: 10px;
`

export const VariantCell = ({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value[0]', []) as string[]
  const colorNumber = get(cell, 'value[1]', -1)
  const history = useHistory()
  const params = useParams()

  const handleOpenVariant = () => {
    const index = get(cell, 'row.index')
    const dsName = params.get('ds')

    history.push(`${Routes.Variant}`, {
      index,
      ds: dsName,
    })
  }

  const copyDetails = () => {
    copyToClipboard(String(value))

    toast.info(t('ds.copied'), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    })
  }

  return (
    <Root>
      <Circle
        style={{
          border: `2px solid ${getVariantColor(colorNumber)}`,
        }}
      />

      <Box style={{ flex: 1 }}>
        {value.map(gene => (
          <StyledText key={gene}>{gene}</StyledText>
        ))}
      </Box>

      <ShareSvg
        style={{ marginLeft: 19, cursor: 'pointer', minWidth: '16px' }}
        onClick={handleOpenVariant}
      />
      <TableDocSvg
        style={{ marginLeft: 10, cursor: 'pointer', minWidth: '16px' }}
        onClick={copyDetails}
      />
    </Root>
  )
}
