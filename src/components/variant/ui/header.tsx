import { Dispatch, ReactElement, SetStateAction } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { closeHandler } from '../drawer'
import { DrawerNote } from './drawer-note'
import { DrawerTags } from './drawer-tags'

interface Props {
  setLayout: Dispatch<SetStateAction<any>>
}

export const VariantHeader = observer(
  ({ setLayout }: Props): ReactElement => {
    const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
    const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
    const canGetPrevVariant = () => !!variantStore.index

    const canGetNextVariant = () =>
      variantStore.index !== get(datasetStore, 'dsStat.total-counts.0', 0) - 1

    const { setVariantIndex } = useVariantIndex()

    const handlePrevVariant = () => {
      if (!variantStore.drawerVisible || !canGetPrevVariant()) return
      variantStore.prevVariant()
      setVariantIndex(variantStore.index)
    }

    const handleNextVariant = () => {
      if (!variantStore.drawerVisible || !canGetNextVariant()) return
      variantStore.nextVariant()
      setVariantIndex(variantStore.index)
    }

    useKeydown([
      { eventCode: 'ArrowUp', callback: handlePrevVariant },
      { eventCode: 'ArrowDown', callback: handleNextVariant },
    ])

    const handleCloseDrawer = () => {
      setVariantIndex()

      closeHandler()
    }

    return (
      <div className="px-4 pb-4 pt-1 bg-blue-dark">
        <div className="flex justify-between">
          <div className="flex items-center">
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
            </div>

            <div className="text-blue-bright font-bold leading-18px">
              {`[${genInfo}] `}
              <span dangerouslySetInnerHTML={{ __html: hg19 }} />
            </div>

            <DrawerTags />

            <DrawerNote />
          </div>

          <div className="flex items-center">
            <div className="flex text-grey-blue">
              <Icon
                name="Expand"
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  setLayout((prev: any[]) =>
                    prev.map((item: any) => ({
                      ...item,
                      h: 6,
                    })),
                  )
                  variantStore.handleAllRecordsOpen(true)
                }}
              />

              <Icon
                name="Collapse"
                size={24}
                className="cursor-pointer ml-1 mr-5"
                onClick={() => {
                  setLayout((prev: any[]) =>
                    prev.map((item: any) => ({
                      ...item,
                      h: 1,
                    })),
                  )
                  variantStore.handleAllRecordsOpen(false)
                }}
              />
            </div>

            <Icon
              name="Close"
              className="cursor-pointer text-white"
              onClick={handleCloseDrawer}
            />
          </div>
        </div>
      </div>
    )
  },
)
