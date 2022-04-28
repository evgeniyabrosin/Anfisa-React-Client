import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import currentFilterStore from '@pages/filter/refiner/components/middle-column/panels/current-filter.store'
import {
  AttributeKinds,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export const NumericPanel = observer((): ReactElement | null => {
  const { attributeStatus: attrData, initialNumericValue: initialValue } =
    currentFilterStore

  if (!attrData || attrData.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  const saveCondition = (value: TNumericConditionBounds) => {
    currentFilterStore.saveNumeric(value)
  }

  return (
    <NumericCondition
      className="mt-4"
      attrData={attrData}
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
              initialValue ? t('dtree.saveChanges') : t('dtree.addAttribute')
            }
            onClick={() => saveCondition(value)}
            disabled={hasErrors || (value[0] === null && value[2] === null)}
          />
        </div>
      )}
    />
  )
})
