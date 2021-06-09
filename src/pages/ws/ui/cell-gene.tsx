import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import styled from 'styled-components'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { getVariantColor } from '@core/get-variant-color'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { ShareSvg } from '@icons/share'
import { Box } from '@ui/box'
import { CopySvg } from '@ui/icons/copy'
import { CellI } from './cell-interfaces'

const Circle = styled(Box)`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50px;
  margin-right: 10px;
`

export const CellGene = ({ cell }: CellI): ReactElement => {
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
    <div className="flex items-center">
      <Circle
        style={{
          border: `2px solid ${getVariantColor(colorNumber)}`,
        }}
      />

      <div>
        {value.map(gene => (
          <span className="text-sm leading-18px" key={gene}>
            {gene}
          </span>
        ))}
      </div>

      <ShareSvg
        className="ml-5 cursor-pointer text-blue-bright"
        onClick={handleOpenVariant}
      />

      <CopySvg
        onClick={copyDetails}
        className="ml-1 cursor-pointer text-blue-bright"
      />
    </div>
  )
}
