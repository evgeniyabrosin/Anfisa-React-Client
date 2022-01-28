import { Fragment } from 'react'

import { t } from '@i18n'
import { Select } from '@ui/select'

interface IProps {
  approxOptions: string[]
  approxValues: string[]
  approxCondition: string
  stateOptions: string[]
  stateCondition: string
  handleSetCondition: (value: string, type: string) => void
}

export const ApproxStateModalMods = ({
  approxOptions,
  approxValues,
  approxCondition,
  stateOptions,
  stateCondition,
  handleSetCondition,
}: IProps) => (
  <Fragment>
    <div className="flex w-1/2">
      <span>{t('dtree.approx')}</span>

      <Select
        options={approxOptions}
        values={approxValues}
        value={approxCondition}
        onChange={(e: any) => handleSetCondition(e.target.value, 'approx')}
        className="w-full ml-2"
        approx
      />
    </div>

    <div className="flex w-1/4">
      <span>{t('dtree.state')}</span>

      <Select
        options={stateOptions}
        value={stateCondition}
        onChange={(e: any) => handleSetCondition(e.target.value, 'state')}
        className="w-full ml-2"
        disabled={!(stateOptions.length > 1)}
      />
    </div>
  </Fragment>
)
