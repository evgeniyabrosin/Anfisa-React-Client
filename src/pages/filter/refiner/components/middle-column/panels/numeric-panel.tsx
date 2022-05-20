import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { NumericCondition } from '@components/numeric-condition'
import { AttributeKinds } from '@service-providers/common/common.interface'
import { refinerAttributeStore } from '../../attributes/refiner-attributes.store'

export const NumericPanel = observer((): ReactElement | null => {
  const { initialNumericValue, attributeStatus } = refinerAttributeStore

  const { isFilterTouched } = filterStore

  if (!attributeStatus || attributeStatus.kind !== AttributeKinds.NUMERIC) {
    return null
  }

  return (
    <NumericCondition
      className="mt-4"
      attrData={attributeStatus}
      initialValue={initialNumericValue}
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
              initialNumericValue
                ? t('dtree.saveChanges')
                : t('dtree.addAttribute')
            }
            onClick={() => refinerAttributeStore.saveNumeric(value)}
            disabled={
              hasErrors ||
              (value[0] === null && value[2] === null) ||
              !isFilterTouched
            }
          />
        </div>
      )}
    />
  )
})
