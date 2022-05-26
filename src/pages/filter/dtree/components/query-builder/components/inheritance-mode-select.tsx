import { FC } from 'react'

import { resetOptions } from '@core/resetOptions'
import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'

interface IInheritanceModeSelectProp {
  resetValue?: string
  handleReset: (e: string) => void
}

export const InheritanceModeSelect: FC<IInheritanceModeSelectProp> = ({
  resetValue,
  handleReset,
}) => {
  const reset = () => handleReset('empty')

  return (
    <>
      <div className="flex justify-between">
        <span className="text-14 leading-16px font-medium text-grey-blue mt-0.5 mb-2.5">
          {t('filter.inheritanceMode')}
        </span>

        <span
          className="text-12 text-blue-bright leading-14px cursor-pointer"
          onClick={reset}
        >
          Reset
        </span>
      </div>

      <div>
        {resetOptions.map(option => (
          <Checkbox
            key={option}
            id={option}
            onChange={() => handleReset(option)}
            checked={resetValue === option}
            className="mb-2 last:mb-0"
          >
            {option}
          </Checkbox>
        ))}
      </div>
    </>
  )
}
