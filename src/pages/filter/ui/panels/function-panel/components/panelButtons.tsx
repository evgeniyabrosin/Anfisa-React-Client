import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'

interface IPanelButtons {
  selectedFilterName: string
  selectedFilterGroup: string
  onSubmit: () => void
  resetForm?: () => void
  resetFields: () => void
  disabled?: boolean
}

export const PanelButtons = observer(
  ({
    selectedFilterName,
    selectedFilterGroup,
    onSubmit,
    resetForm,
    resetFields,
    disabled,
  }: IPanelButtons): ReactElement => {
    const isFilterExistsInSelectedFilters: boolean =
      datasetStore.activePreset !== '' &&
      filterStore.selectedFilters[selectedFilterGroup]?.[selectedFilterName] !==
        undefined

    const handleClear = () => {
      if (isFilterExistsInSelectedFilters) {
        datasetStore.resetActivePreset()
      }

      datasetStore.removeFunctionConditionAsync(selectedFilterName)
      filterStore.removeSelectedFilters({
        group: selectedFilterGroup,
        groupItemName: selectedFilterName,
      })

      filterStore.resetStatFuncData()

      if (!datasetStore.isXL) {
        datasetStore.fetchWsListAsync()
      }

      resetFields && resetFields()

      resetForm && resetForm()
    }

    return (
      <div className="flex items-center justify-between mt-5">
        <Button
          text={t('general.clear')}
          variant={'secondary'}
          onClick={handleClear}
        />

        <Button
          text={t('general.add')}
          onClick={onSubmit}
          disabled={disabled}
        />
      </div>
    )
  },
)
