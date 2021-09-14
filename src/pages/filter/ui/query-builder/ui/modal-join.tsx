import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Card } from '@ui/card'

export const ModalJoin = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalJoin())

    const handleJoin = (typeOfJoin: string, typeOfAttr: string) => {
      dtreeStore.joinStepData(typeOfJoin, typeOfAttr)
      dtreeStore.closeModalJoin()
      dtreeStore.closeModalSelectFilter()
    }

    return (
      <div ref={ref} className="top-10 absolute text-14 font-normal">
        <Card className="z-50 top-8 w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md">
          <div
            onClick={() => handleJoin('and', 'enum')}
            className="cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md py-2 px-2 hover:bg-blue-bright hover:text-white"
          >
            {t('dtree.joinByAnd')}
          </div>

          <div
            onClick={() => handleJoin('or', 'enum')}
            className="cursor-pointer py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
          >
            {t('dtree.joinByOr')}
          </div>
        </Card>
      </div>
    )
  },
)
