import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import datasetStore from '@store/dataset/dataset'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { Routes } from '@router/routes.enum'
import { ArrowButton } from '@ui/arrow-button'
import { Icon } from '@ui/icon'
import {
  HgModes,
  IAttributeDescriptors,
} from '@service-providers/dataset-level/dataset-level.interface'
import { findElementInRow } from '@utils/mian-table/find-element-in-row'
import { DrawerNote } from './drawer-note/drawer-note'
import { DrawerTags } from './drawer-tags'

interface IVariantHeaderProps {
  setLayout: Dispatch<SetStateAction<any>>
}

export const VariantHeader = observer(
  ({ setLayout }: IVariantHeaderProps): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const { tabReport } = mainTableStore
    const variant = toJS(variantStore.variant)
    const rows: IAttributeDescriptors[] = get(variant, '[0].rows', [])

    const variantWithoutGenesName = 'None'
    const genes = findElementInRow(rows, 'genes') || variantWithoutGenesName

    const hg19locus = findElementInRow(rows, 'hg19')
    const hg38locus = findElementInRow(rows, 'hg38')

    const { locusMode } = datasetStore
    const currentLocus = locusMode === HgModes.HG19 ? hg19locus : hg38locus

    const currentIndex = mainTableStore.filteredNo.indexOf(variantStore.index)
    const isNoPrevVariant = currentIndex <= 0
    const isNoNextVariant = currentIndex + 1 >= mainTableStore.filteredNo.length

    const { setVariantIndex } = useVariantIndex()

    const handlePrevVariant = () => {
      if (!variantStore.drawerVisible || isNoPrevVariant) return
      variantStore.prevVariant()
    }

    const handleNextVariant = () => {
      if (!variantStore.drawerVisible || isNoNextVariant) return
      variantStore.nextVariant()
    }

    useKeydown([
      { eventCode: 'ArrowUp', callback: handlePrevVariant },
      { eventCode: 'ArrowDown', callback: handleNextVariant },
    ])

    const handleCloseDrawer = () => {
      if (variantStore.isTagsModified) {
        tabReport.invalidatePage(mainTableStore.openedVariantPageNo)
        mainTableStore.fetchWsTagsAsync()
      }

      columnsStore.closeDrawer()
      variantStore.setIsTagsModified(false)

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
              <ArrowButton
                size="md"
                className="mr-2"
                direction="up"
                disabled={isNoPrevVariant}
                onClick={handlePrevVariant}
              />
              <ArrowButton
                size="md"
                className="mr-3"
                direction="down"
                disabled={isNoNextVariant}
                onClick={handleNextVariant}
              />
            </div>
            <div className="text-blue-bright font-bold leading-18px">
              {`[${genes}] `}
              <span dangerouslySetInnerHTML={{ __html: currentLocus }} />
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
