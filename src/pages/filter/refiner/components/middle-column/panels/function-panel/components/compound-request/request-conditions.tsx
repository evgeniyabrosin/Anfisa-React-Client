import { ChangeEvent, MouseEvent } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { selectOptions } from '@pages/filter/dtree/components/modals/modals-control-store'
import { getSelectedValue } from '@utils/function-panel/getSelectedValue'
import functionPanelStore from '../../function-panel.store'
import compoundRequestStore from './compound-request.store'

interface IRequestConditionsProps {
  requestBlockNumber: number
  index: number
  activeRequestIndex: number
}

export const RequestConditions = observer(
  ({
    requestBlockNumber,
    index,
    activeRequestIndex,
  }: IRequestConditionsProps): JSX.Element => (
    <div className="flex flex-col w-full mt-4 text-14">
      <div className="flex flex-col w-full">
        <div
          className={cn(
            'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
            index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
          )}
          onClick={() => {
            compoundRequestStore.handleActiveRequest(index)
            filterStore.setTouched(true)
          }}
        >
          <div className="flex cursor-pointer step-content-area">
            <InputNumber
              value={requestBlockNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (requestBlockNumber !== Number.parseInt(e.target.value)) {
                  filterStore.setTouched(true)
                }
                compoundRequestStore.handleRequestConditionNumber(
                  index,
                  +e.target.value,
                )
              }}
              className="shadow-dark w-1/3 h-5 bg-blue-medium"
            />
          </div>

          <div className="flex flex-1 justify-between step-content-area">
            {functionPanelStore.problemGroups.map(
              (group: string, currNo: number) => {
                const value = getSelectedValue(
                  group,
                  index,
                  compoundRequestStore.requestCondition,
                )
                return (
                  <div
                    className="step-content-area"
                    key={group}
                    onClick={() => {
                      compoundRequestStore.handleActiveRequest(index)
                    }}
                  >
                    <span className="cursor-pointer step-content-area">
                      {group}
                    </span>

                    <Select
                      onClick={(e: MouseEvent<any>) => e.stopPropagation()}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        if (value !== e.target.value) {
                          filterStore.setTouched(true)
                        }
                        compoundRequestStore.handleSetSingleRequest(
                          index,
                          currNo,
                          e.target,
                        )
                      }}
                      className="w-auto ml-1"
                      options={selectOptions}
                      value={value}
                    />
                  </div>
                )
              },
            )}
          </div>
        </div>
        {requestBlockNumber <= 0 && (
          <div className="flex items-center mt-1 h-3 text-10 text-red-secondary">
            {t('dtree.minimalCountsOfEventsOnCompoundRequest')}
          </div>
        )}
      </div>
    </div>
  ),
)
