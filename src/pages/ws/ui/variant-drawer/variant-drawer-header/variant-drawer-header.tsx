import { ReactElement } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { Routes } from '@router/routes.enum'
import { ArrowButton } from '@ui/arrow-button'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { DrawerLayoutControl } from '@pages/ws/ui/variant-drawer/variant-drawer-header/drawer-layout-control'
import { variantDrawerStore } from '../variant-drawer.store'
import { DrawerNote } from './drawer-note/drawer-note'
import { DrawerTags } from './drawer-tags'

interface IVariantDrawerHeaderProps {
  className?: string
  windowsOpenState: boolean
  onWindowsToggle: (state: boolean) => void
}

export const VariantDrawerHeader = observer(
  ({
    className,
    windowsOpenState,
    onWindowsToggle,
  }: IVariantDrawerHeaderProps): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const { tabReport } = mainTableStore
    const {
      record: { locus, genes },
    } = variantStore
    const {
      layoutMode,
      setLayoutMode,
      gridPresets,
      applyGridPreset,
      saveGridPreset,
    } = variantDrawerStore

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
      <div
        className={cn(
          'px-4 bg-blue-dark flex justify-between items-start',
          className,
        )}
      >
        <div className="flex items-center flex-wrap">
          <div className="flex items-center my-2">
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
          <div className="flex items-center my-2">
            <div className="text-blue-bright font-bold leading-18px ">
              {`[${genes}] `}
              <span dangerouslySetInnerHTML={{ __html: locus }} />
            </div>
            <Divider orientation="vertical" />
          </div>
          <div className="flex items-center my-2">
            <DrawerTags />
            <Divider orientation="vertical" />
            <DrawerNote />
          </div>
        </div>

        <div className="flex items-center my-2">
          <DrawerLayoutControl
            layoutMode={layoutMode}
            onChangeLayoutMode={setLayoutMode}
            gridPresets={gridPresets}
            onSaveGridPreset={saveGridPreset}
            onChangeGridPreset={applyGridPreset}
            windowsOpenState={windowsOpenState}
            onWindowsToggle={onWindowsToggle}
          />
          <Divider orientation="vertical" spacing="dense" />
          <button className="w-4 h-4 flex items-center justify-center  text-white hover:text-blue-bright">
            <Icon name="Close" onClick={handleCloseDrawer} size={16} />
          </button>
        </div>
      </div>
    )
  },
)
