import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import { Routes } from '@router/routes.enum'
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
    const history = useHistory()
    const location = useLocation()

    const genInfo = get(
      toJS(variantStore.variant),
      '[0].rows[0].cells[0][0]',
      '',
    )

    const hg19 = get(toJS(variantStore.variant), '[0].rows[1].cells[0][0]', '')
    const filteredNo = toJS(datasetStore.filteredNo)

    const canGetPrevVariant = (): boolean => {
      return !(filteredNo[filteredNo.indexOf(variantStore.index) - 1] >= 0)
    }

    const canGetNextVariant = (): boolean => {
      return !(filteredNo[filteredNo.indexOf(variantStore.index) + 1] >= 0)
    }

    const { setVariantIndex } = useVariantIndex()

    const handlePrevVariant = () => {
      if (!variantStore.drawerVisible || canGetPrevVariant()) return
      variantStore.prevVariant()
    }

    const handleNextVariant = () => {
      if (!variantStore.drawerVisible || canGetNextVariant()) return
      variantStore.nextVariant()
    }

    useKeydown([
      { eventCode: 'ArrowUp', callback: handlePrevVariant },
      { eventCode: 'ArrowDown', callback: handleNextVariant },
    ])

    const handleCloseDrawer = () => {
      datasetStore.fetchWsListAsync()
      datasetStore.fetchWsTagsAsync()

      closeHandler()

      // if url has 'variant' should be navigated to prev route
      const previousLocation = location.search.split('&variant')[0]

      history.push(`${Routes.WS + previousLocation}`)
      setVariantIndex()
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
                disabled={canGetPrevVariant()}
                onClick={handlePrevVariant}
              />

              <Button
                size="sm"
                icon={<Icon name="Arrow" className="transform -rotate-90" />}
                className="bg-blue-lighter mx-2"
                disabled={canGetNextVariant()}
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
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => {
                  const parents = document.querySelectorAll('#parent')

                  setLayout((prev: any[]) => {
                    const newLayout = prev.map((item: any, index: number) => ({
                      ...item,
                      h:
                        get(
                          parents[index].children[1].firstChild,
                          'clientHeight',
                          0,
                        ) *
                          0.0208 +
                        1.3,
                      y: index,
                    }))

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(newLayout),
                    )

                    return newLayout
                  })
                }}
              />

              <Icon
                name="Collapse"
                size={24}
                className="cursor-pointer hover:text-blue-bright ml-1 mr-5"
                onClick={() => {
                  setLayout((prev: any[]) => {
                    const newLayout = prev.map((item: any) => ({
                      ...item,
                      h: 1,
                    }))

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(newLayout),
                    )

                    return newLayout
                  })
                }}
              />
            </div>

            <Icon
              name="Close"
              className="cursor-pointer text-white hover:text-blue-bright"
              onClick={handleCloseDrawer}
            />
          </div>
        </div>
      </div>
    )
  },
)
