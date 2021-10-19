import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'

interface IProps {
  numericData?: any[]
}

export const ModalJoin = observer(
  ({ numericData }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalJoin())

    const handleJoin = (typeOfJoin: 'JOIN-AND' | 'JOIN-OR') => {
      numericData
        ? addAttributeToStep(typeOfJoin, 'numeric', numericData)
        : addAttributeToStep(typeOfJoin, 'enum')

      dtreeStore.closeModalJoin()
      dtreeStore.closeModalSelectFilter()
      dtreeStore.closeModalSelectNumbers()
      dtreeStore.closeModalSelectInheritanceMode()
      dtreeStore.closeModalSelectCustomInheritanceMode()
    }

    return (
      <div ref={ref} className="top-10 absolute z-50 text-14 font-normal">
        <div className="top-8 w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
          <div
            onClick={() => handleJoin('JOIN-AND')}
            className="cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md py-2 px-2 hover:bg-blue-bright hover:text-white"
          >
            {t('dtree.joinByAnd')}
          </div>

          <div
            onClick={() => handleJoin('JOIN-OR')}
            className="cursor-pointer py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
          >
            {t('dtree.joinByOr')}
          </div>
        </div>
      </div>
    )
  },
)
