import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import {
  IViewVariantsModalProps,
  ViewVariantsModal,
} from '@pages/filter/common/view-variants'

interface IFilterRefinerViewVariantsProps
  extends Omit<IViewVariantsModalProps, 'query'> {}

export const FilterRefinerViewVariants = observer(
  (props: IFilterRefinerViewVariantsProps) => (
    <ViewVariantsModal {...props} query={filterStore.viewVariantsQuery} />
  ),
)
