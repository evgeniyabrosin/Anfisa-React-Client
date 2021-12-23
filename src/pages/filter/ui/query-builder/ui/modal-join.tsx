import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

interface IProps {
  handleAddAttribute: (action: ActionType) => void
}

export const ModalJoin = observer(
  ({ handleAddAttribute }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalJoin())

    const handleJoin = (typeOfJoin: 'JOIN-AND' | 'JOIN-OR') => {
      handleAddAttribute(typeOfJoin)

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
            data-testId={DecisionTreesResultsDataCy.joinByAnd}
          >
            {t('dtree.joinByAnd')}
          </div>

          <div
            onClick={() => handleJoin('JOIN-OR')}
            className="cursor-pointer py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
            data-testId={DecisionTreesResultsDataCy.joinByOr}
          >
            {t('dtree.joinByOr')}
          </div>
        </div>
      </div>
    )
  },
)
