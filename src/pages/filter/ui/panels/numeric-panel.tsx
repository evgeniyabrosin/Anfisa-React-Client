import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import {
  INumericPropertyStatus,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export const NumericPanel = observer((): ReactElement => {
  const {
    isRedactorMode,
    selectedGroupItem: attrData,
    selectedNumericFilterValue: initialValue,
    activeFilterId,
  } = filterStore

  const saveCondition = (value: TNumericConditionBounds) => {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()
    filterStore.saveFilter([FilterKindEnum.Numeric, attrData.name, value])
  }

  return (
    <NumericCondition
      className="mt-4"
      key={`${attrData.name}_${activeFilterId}`}
      attrData={attrData as INumericPropertyStatus}
      initialValue={initialValue}
      controls={({ value, hasErrors, clearValue }) => (
        <div className="flex items-center justify-end mt-1">
          <Button
            variant={'secondary'}
            text={t('general.clear')}
            onClick={clearValue}
            className="px-5 mr-2"
          />
          <Button
            text={
              isRedactorMode ? t('dtree.saveChanges') : t('dtree.addAttribute')
            }
            onClick={() => saveCondition(value)}
            disabled={hasErrors || (value[0] === null && value[2] === null)}
          />
        </div>
      )}
    />
  )
})
