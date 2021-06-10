import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { getVariantColor } from '@core/get-variant-color'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
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

export const CellGene = observer(
  ({ cell }: CellI): ReactElement => {
    const gene = String(get(cell, 'value[0]', []))
    const colorNumber = get(cell, 'value[1]', -1)
    const params = useParams()

    const handleOpenVariant = () => {
      datasetStore.setColumns(['Gene', 'Variant'])
      datasetStore.showColumns()
      variantStore.setIndex(get(cell, 'row.index'))
      variantStore.setDsName(params.get('ds') ?? '')
      variantStore.setDrawerVisible(true)
    }

    const copyDetails = () => {
      copyToClipboard(gene)

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

        <span className="text-sm leading-18px">{gene}</span>

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
  },
)
