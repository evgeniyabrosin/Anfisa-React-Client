import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Tag } from '@ui/tag'
import { closeHandler } from '../drawer'

export const VariantHeader = observer(
  (): ReactElement => {
    const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
    const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
    const canGetPrevVariant = () => !!variantStore.index

    const canGetNextVariant = () =>
      variantStore.index !== get(datasetStore, 'dsStat.total-counts.0', 0) - 1

    const handlePrevVariant = () => {
      if (!variantStore.drawerVisible || !canGetPrevVariant()) return
      variantStore.prevVariant()
    }

    const handleNextVariant = () => {
      if (!variantStore.drawerVisible || !canGetNextVariant()) return
      variantStore.nextVariant()
    }

    useKeydown([
      { eventCode: 'ArrowUp', callback: handlePrevVariant },
      { eventCode: 'ArrowDown', callback: handleNextVariant },
    ])

    return (
      <div className="px-4 pb-4 pt-1 bg-blue-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              size="sm"
              icon={<Icon name="Arrow" className="transform rotate-90" />}
              className="bg-blue-lighter"
              disabled={!canGetPrevVariant()}
              onClick={handlePrevVariant}
            />

            <Button
              size="sm"
              icon={<Icon name="Arrow" className="transform -rotate-90" />}
              className="bg-blue-lighter mx-2"
              disabled={!canGetNextVariant()}
              onClick={handleNextVariant}
            />

            <div className="text-blue-bright font-bold text-16 leading-18px">{`[${genInfo}] ${hg19}`}</div>

            {variantStore.tags.length > 0 && (
              <div className="text-white ml-3 flex items-center">
                {variantStore.tags.map(tag => (
                  <Tag text={tag} key={tag} isActive />
                ))}
              </div>
            )}
          </div>

          <Icon
            name="Close"
            className="cursor-pointer text-white"
            onClick={closeHandler}
          />
        </div>
      </div>
    )
  },
)
