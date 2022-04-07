import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import { RadioButton } from '@ui/radio-button'

interface Props {
  viewType: ViewTypeEnum
  setViewType: (viewType: ViewTypeEnum) => void
}

export const ViewTypeTable = observer(
  ({ viewType, setViewType }: Props): ReactElement => (
    <div className="flex items-center text-14 leading-14 mt-3">
      {[ViewTypeEnum.Compact, ViewTypeEnum.Cozy].map(viewTypeItem => (
        <div key={viewTypeItem} className="mr-4 flex items-center">
          <RadioButton
            isChecked={viewType === viewTypeItem}
            onChange={() => setViewType(viewTypeItem)}
          />
          <span className="ml-1">{t(`ds.${viewTypeItem}`)}</span>
        </div>
      ))}
    </div>
  ),
)
