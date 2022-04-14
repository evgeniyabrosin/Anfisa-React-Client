import { ChangeEvent, MouseEvent } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { selectOptions } from '@pages/filter/ui/modal-edit/modal-edit.store'
import { TRequestCondition } from '@service-providers/common'
import { getSelectedValue } from '@utils/function-panel/getSelectedValue'
import functionPanelStore from '../../function-panel.store'
import compoundRequestStore from './compound-request.store'

interface IRequestConditionsProps {
  activeRequestIndex: number
}

export const RequestConditions = observer(
  ({ activeRequestIndex }: IRequestConditionsProps): JSX.Element => (
    <div className="flex flex-col w-full mt-4 text-14">
      {compoundRequestStore.requestCondition.map(
        (item: TRequestCondition, index: number) => (
          <div
            className={cn(
              'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
              index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
            )}
            key={item.toString() + index}
            onClick={() => compoundRequestStore.handleActiveRequest(index)}
          >
            <div className="flex cursor-pointer step-content-area">
              <InputNumber
                value={item[0]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  compoundRequestStore.handleRequestConditionNumber(
                    index,
                    e.target.value,
                  )
                }
                className="shadow-dark w-1/3 h-5 bg-blue-medium"
              />
            </div>

            <div className="flex flex-1 justify-between step-content-area">
              {functionPanelStore.problemGroups.map(
                (group: string, currNo: number) => (
                  <div
                    className="step-content-area"
                    key={group}
                    onClick={() =>
                      compoundRequestStore.handleActiveRequest(index)
                    }
                  >
                    <span className="cursor-pointer step-content-area">
                      {group}
                    </span>

                    <Select
                      onClick={(e: MouseEvent<any>) => e.stopPropagation()}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        compoundRequestStore.handleSetSingleRequest(
                          index,
                          currNo,
                          e.target,
                        )
                      }}
                      className="w-auto ml-1"
                      options={selectOptions}
                      value={getSelectedValue(
                        group,
                        index,
                        compoundRequestStore.requestCondition,
                      )}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        ),
      )}
    </div>
  ),
)
