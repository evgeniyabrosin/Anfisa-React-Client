import React from 'react'
import { observer } from 'mobx-react-lite'

import { CompoundRequestScenario } from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/compound-request/components/compound-request-scenario'
import { TRequestCondition } from '@service-providers/common'
import compoundRequestStore from '../compound-request.store'

interface IRequestConditionsProps {
  activeRequestIndex: number
}

export const RequestConditions = observer(
  ({ activeRequestIndex }: IRequestConditionsProps): JSX.Element => (
    <div className="flex flex-col w-full text-14 mb-8">
      {compoundRequestStore.requestCondition.map(
        (item: TRequestCondition, index: number) => (
          <CompoundRequestScenario
            key={item.toString() + index}
            item={item}
            index={index}
            className={
              activeRequestIndex === index &&
              '-mx-4 -my-4 px-4 py-4 bg-blue-light'
            }
          />
        ),
      )}
    </div>
  ),
)
