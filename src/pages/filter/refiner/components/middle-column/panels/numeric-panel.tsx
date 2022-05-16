import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import { AttributeHeader } from '@pages/filter/refiner/components/middle-column/attribute-header'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import currentFilterStore from '@pages/filter/refiner/components/middle-column/panels/current-filter.store'
import {
  AttributeKinds,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export const NumericPanel = observer((): ReactElement | null => {
  const { attributeStatus: attrData, initialNumericValue: initialValue } =
    currentFilterStore

  const { selectedAttributeStatus, isFilterTouched } = filterStore

  if (!attrData || attrData.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  const saveCondition = (value: TNumericConditionBounds) => {
    filterStore.setTouched(false)
    currentFilterStore.saveNumeric(value)
  }

  return (
    <>
      <AttributeHeader attrStatus={selectedAttributeStatus!} />

      <DividerHorizontal />

      <NumericCondition
        attrData={attrData}
        initialValue={initialValue}
        controls={({ value, hasErrors, clearValue }) => (
          <div className="flex-1 flex items-end justify-end mt-1 pb-[40px]">
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
              disabled={
                hasErrors ||
                (value[0] === null && value[2] === null) ||
                !isFilterTouched
              }
            />
          </div>
        )}
      />
    </>
  )
})
