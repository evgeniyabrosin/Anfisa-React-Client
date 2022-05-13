import { ChangeEvent, ReactElement } from 'react'

import { approxOptions } from '@core/approxOptions'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import { Select } from '@ui/select'

interface IAprroxAndStateProps {
  approx: string
  setApprox: (value: ApproxNameTypes) => void
}

export const AprroxAndState = ({
  approx,
  setApprox,
}: IAprroxAndStateProps): ReactElement => (
  <div className="flex">
    <div className="flex items-center">
      <span className="mr-2 text-18 leading-14px">{'Approx:'}</span>

      <Select
        value={approx}
        options={approxOptions}
        disabled={datasetStore.isXL}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setApprox(e.target.value as ApproxNameTypes)
        }
      />
    </div>

    <div className="flex items-center ml-3">
      <span>{t('dtree.state')}</span>

      <Select options={['current']} className="w-full ml-2" disabled={true} />
    </div>
  </div>
)
