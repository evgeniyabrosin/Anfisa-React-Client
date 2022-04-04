import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import operationsStore from '@store/operations'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from './data-testid/main-table.cy'
import { Loader } from './loader'

interface Props {
  isOpen?: boolean
  refEl: any
  onClick?: () => void
}

export const ExportReportButton = observer(
  ({ isOpen, refEl, ...rest }: Props): ReactElement => {
    const { variantCounts } = datasetStore.fixedStatAmount
    const areVariantsZero = variantCounts === 0

    return (
      <Button
        disabled={areVariantsZero}
        text={
          operationsStore.isExportingReport ? (
            <Loader size="xs" color="white" />
          ) : (
            t('general.exportReport')
          )
        }
        dataTestId={MainTableDataCy.exportReport}
        refEl={refEl}
        size="sm"
        prepend={<Icon name="Export" />}
        onClick={rest.onClick}
        style={{
          width: '135px',
          pointerEvents: operationsStore.isExportingReport ? 'none' : 'inherit',
        }}
        append={
          <Icon
            name="Arrow"
            className={cn(
              'transform transition-transform',
              isOpen ? 'rotate-90' : '-rotate-90',
            )}
          />
        }
      />
    )
  },
)
