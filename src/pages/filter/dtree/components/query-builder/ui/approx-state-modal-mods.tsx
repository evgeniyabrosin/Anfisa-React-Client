import { ChangeEvent, Fragment } from 'react'

import { approxOptions } from '@core/approxOptions'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import { Select } from '@ui/select'

interface IProps {
  approx: string
  handleSetCondition: (approx: ApproxNameTypes) => void
}

export const ApproxStateModalMods = ({
  approx,
  handleSetCondition,
}: IProps) => (
  <Fragment>
    <div className="flex w-1/2">
      <span>{t('dtree.approx')}</span>

      <Select
        value={approx}
        options={approxOptions}
        disabled={datasetStore.isXL}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleSetCondition(e.target.value as ApproxNameTypes)
        }
        className="w-full ml-2"
      />
    </div>

    <div className="flex w-1/4">
      <span>{t('dtree.state')}</span>

      <Select className="w-full ml-2" disabled={true} options={['current']} />
    </div>
  </Fragment>
)
