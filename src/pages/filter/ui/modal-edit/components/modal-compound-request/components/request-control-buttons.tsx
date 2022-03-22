import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Select } from '@ui/select'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { resetOptions } from '@pages/filter/ui/panels/function-panel/components/compound-request/approx-state'
import modalCompoundRequestStore from '../modal-compound-request.store'

export const RequestControlButtons = observer((): ReactElement => {
  const { requestCondition, resetValue } = modalCompoundRequestStore
  return (
    <div className="flex items-center justify-between w-full mt-4 text-14">
      <div className="flex">
        <Button
          onClick={() =>
            modalCompoundRequestStore.setRequestBlocksAmount('ADD')
          }
          text="Add"
          variant={'secondary'}
          className={cn('mr-4')}
          disabled={requestCondition.length === 5}
          dataTestId={DecisionTreeModalDataCy.addButton}
        />

        <Button
          onClick={() =>
            modalCompoundRequestStore.setRequestBlocksAmount('REMOVE')
          }
          text="Remove"
          variant={'secondary'}
          className={cn(
            'border-red-secondary hover:text-white hover:bg-red-secondary',
          )}
          disabled={requestCondition.length === 1}
          dataTestId={DecisionTreeModalDataCy.removeButton}
        />
      </div>

      <div className="flex w-1/2">
        <span>{t('dtree.reset')}</span>

        <Select
          options={resetOptions}
          value={resetValue}
          onChange={(e: any) =>
            modalCompoundRequestStore.setComplexScenario(e.target.value)
          }
          className="w-full ml-2"
          reset
          data-testid={DecisionTreeModalDataCy.selectReset}
        />
      </div>
    </div>
  )
})
