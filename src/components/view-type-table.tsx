import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import { Radio } from '@ui/radio'

interface Props {
  viewType: ViewTypeEnum
  setViewType: (viewType: ViewTypeEnum) => void
}

export const ViewTypeTable = observer(
  ({ viewType, setViewType }: Props): ReactElement => (
    <div className="flex items-center text-14 leading-14 mt-3">
      {[ViewTypeEnum.Compact, ViewTypeEnum.Cozy].map(viewTypeItem => (
        <Radio
          checked={viewType === viewTypeItem}
          id={viewTypeItem}
          key={viewTypeItem}
          className="mr-4 flex items-center"
          onChange={() => setViewType(viewTypeItem)}
        >
          {t(`ds.${viewTypeItem}`)}
        </Radio>
      ))}
    </div>
  ),
)
