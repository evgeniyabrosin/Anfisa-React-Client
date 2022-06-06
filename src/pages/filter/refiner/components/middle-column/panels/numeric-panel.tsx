import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import { AttributeHeader } from '@pages/filter/refiner/components/middle-column/attribute-header'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { AttributeKinds } from '@service-providers/common/common.interface'
import { refinerAttributeStore } from '../../attributes/refiner-attributes.store'
import { savePanelAttribute } from './utils/save-pannel-attribute'

export const NumericPanel = observer((): ReactElement | null => {
  const { initialNumericValue, attributeStatus, attributeName } =
    refinerAttributeStore

  const { selectedAttributeStatus, isFilterTouched } = filterStore

  if (!attributeStatus || attributeStatus.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  return (
    <>
      <AttributeHeader attrStatus={selectedAttributeStatus!} />

      <DividerHorizontal />

      <NumericCondition
        attrData={attributeStatus}
        initialValue={initialNumericValue}
        controls={({ value, hasErrors, clearValue }) => {
          const disabled =
            hasErrors ||
            (value[0] == null && value[2] == null) ||
            (typeof attributeStatus.min !== 'number' &&
              typeof attributeStatus.max !== 'number') ||
            !isFilterTouched
          return (
            <div className="flex-1 flex items-end justify-end mt-1 pb-6">
              <Button
                variant={'secondary'}
                text={t('general.clear')}
                onClick={clearValue}
                className="px-5 mr-2"
              />
              <Button
                text={
                  initialNumericValue
                    ? t('dtree.saveChanges')
                    : t('dtree.addAttribute')
                }
                onClick={() =>
                  savePanelAttribute({
                    filterKind: FilterKindEnum.Numeric,
                    attributeName,
                    value,
                  })
                }
                disabled={disabled || !isFilterTouched}
              />
            </div>
          )
        }}
      />
    </>
  )
})
