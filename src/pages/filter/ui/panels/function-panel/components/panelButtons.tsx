import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import functionPanelStore from '../function-panel.store'

interface IPanelButtons {
  onSubmit: () => void
  resetFields: () => void
  disabled?: boolean
  selectedFilterValue?: string
}

export const PanelButtons = observer(
  ({
    onSubmit,
    resetFields,
    disabled,
    selectedFilterValue,
  }: IPanelButtons): ReactElement => {
    const handleClear = () => {
      if (functionPanelStore.isFilterExistsInAppliedPreset) {
        datasetStore.resetActivePreset()
      }

      datasetStore.removeFunctionConditionAsync(functionPanelStore.filterName)

      functionPanelStore.clearGroupFilter()

      filterStore.resetStatFuncData()

      if (!datasetStore.isXL) {
        datasetStore.fetchWsListAsync()
      }

      resetFields()
    }

    return (
      <div className="flex items-center justify-between mt-5">
        <Button
          text={t('general.clear')}
          variant={'secondary'}
          onClick={handleClear}
        />

        <div className="flex justify-end">
          <Button
            text={t('general.add')}
            onClick={onSubmit}
            disabled={
              disabled ||
              functionPanelStore.isFilterInSelectedFilters(
                selectedFilterValue || '',
              )
            }
          />
        </div>
      </div>
    )
  },
)
