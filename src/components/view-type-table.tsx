import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox'
import { RadioButton } from '@ui/radio-button'

interface Props {
  viewType: ViewTypeEnum
  setViewType: (viewType: ViewTypeEnum) => void
}

export const ViewTypeTable = observer(
  ({ viewType, setViewType }: Props): ReactElement => (
    <div className="flex items-center text-14 leading-14 mt-3">
      {[ViewTypeEnum.Compact, ViewTypeEnum.Cozy].map(viewTypeItem => (
        <>
          {/*<div key={viewTypeItem} className="mr-4 flex items-center">
            <RadioButton
              isChecked={viewType === viewTypeItem}
              onChange={() => setViewType(viewTypeItem)}
            />
            <span className="ml-1">{t(`ds.${viewTypeItem}`)}</span>
          </div>*/}
          <Checkbox
            label={t(`ds.${viewTypeItem}`)}
            checked={viewType === viewTypeItem}
            id={viewTypeItem}
            key={viewTypeItem}
            className="mr-4 flex items-center"
            lcn="ml-1"
            onChange={() => setViewType(viewTypeItem)}
          />
        </>
      ))}
    </div>
  ),
)
