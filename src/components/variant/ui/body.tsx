import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import GridLayout from 'react-grid-layout'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import { clone, get } from 'lodash'
import { observer } from 'mobx-react-lite'
import Tooltip from 'rc-tooltip'

import { IGridLayout } from '@declarations'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Icon } from '@ui/icon'
import {
  ICommonAspectDescriptor,
  IPreAspectDescriptor,
  ITableAspectDescriptor,
  TRecCntResponse,
} from '@service-providers/dataset-level/dataset-level.interface'
import { IgvButton } from './igv-button'

const normClass = 'norm'
const normHitClass = 'norm hit'
const noTrHitClass = 'no-tr-hit'

const PreView = ({
  content,
}: ICommonAspectDescriptor & IPreAspectDescriptor): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

const TableView = ({
  colhead,
  rows,
  name,
}: ICommonAspectDescriptor & ITableAspectDescriptor): ReactElement => {
  let colheadData: string[] = []

  if (colhead) {
    colheadData = [colhead?.[0]?.[0]]

    if (colheadData[0]) {
      const endOfString = colheadData[0].indexOf(']')

      colheadData[0] = colheadData[0].slice(0, endOfString + 1)

      if (name === 'view_transcripts') {
        colheadData.push(t('variant.showSelectionOnly'))
      }
    }
  }

  const [filterSelection, setFilterSelection] = useState(normClass)

  const handleSelection = (checked: boolean) => {
    checked ? setFilterSelection(normHitClass) : setFilterSelection(normClass)
  }

  return (
    <div>
      {rows?.length === 0 ? (
        <div className="flex justify-center text-center w-full">
          {'No data to show'}
        </div>
      ) : (
        <table className="min-w-full">
          {colhead && colhead.length > 0 && (
            <thead>
              <tr className="text-blue-bright border-b border-blue-lighter">
                <td />
                {colheadData.map((th, i) => (
                  <td key={i} className="py-3 pr-4">
                    {th}

                    {th === t('variant.showSelectionOnly') && (
                      <Checkbox
                        checked={filterSelection !== normClass}
                        className="ml-1"
                        onChange={(e: any) => handleSelection(e.target.checked)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows?.map((row, i) => {
              if (!row) return <tr key={i} />

              return (
                <tr
                  key={row.name}
                  className="border-b last:border-0 border-blue-lighter"
                >
                  <Tooltip
                    overlay={row.tooltip}
                    placement="bottomLeft"
                    trigger={row.tooltip ? ['hover'] : []}
                  >
                    <td className="py-3 pr-3 text-blue-bright whitespace-nowrap">
                      {row.title}
                    </td>
                  </Tooltip>

                  {row.cells
                    .filter(cell => cell[1]?.includes(filterSelection))
                    .map((cell, cIndex) => (
                      <td
                        key={cIndex}
                        className={cn(
                          'py-3 pr-3 font-normal',
                          cell[0].includes('</a>')
                            ? 'text-blue-bright'
                            : !cell[1]?.includes(noTrHitClass) &&
                                'text-grey-blue',
                        )}
                        dangerouslySetInnerHTML={{ __html: cell[0] }}
                      />
                    ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

interface Props {
  drawerWidth: number
  layout: IGridLayout[]
  setLayout: Dispatch<SetStateAction<IGridLayout[]>>
}

export const VariantBody = observer(
  ({ drawerWidth, layout, setLayout }: Props): ReactElement => {
    const filtered = variantStore.variant

    // important variable to prevent variant block compression after first render
    let indicator = 0

    useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      indicator = 1
    })

    const sortGridLayout = (gridLayout: IGridLayout[]) => {
      return [...gridLayout].sort((a, b) => a.y - b.y)
    }

    return (
      <GridLayout
        cols={6}
        layout={layout}
        rowHeight={40}
        containerPadding={[16, 16]}
        width={drawerWidth}
        margin={[8, 8]}
        className="flex-grow overflow-y-auto overflow-x-hidden"
        draggableHandle=".dragHandleSelector"
        onResizeStop={layoutData => {
          layoutData.forEach(layoutItem => {
            variantStore.updateRecordsDisplayConfig(layoutItem.i, layoutItem.h)
          })

          variantStore.checkRecodsDisplaying()
          SessionStoreManager.write('gridLayout', sortGridLayout(layoutData))
          setLayout(layoutData)
        }}
        onLayoutChange={layoutData => {
          if (indicator === 0) {
            return
          } else {
            const sortedGridLayout = sortGridLayout(layoutData)

            layoutData.forEach(layoutItem => {
              variantStore.updateRecordsDisplayConfig(
                layoutItem.i,
                layoutItem.h,
              )
            })

            variantStore.checkRecodsDisplaying()
            SessionStoreManager.write('gridLayout', sortedGridLayout)
            setLayout(sortedGridLayout)
          }
        }}
      >
        {filtered.map((aspect: TRecCntResponse, index: number) => {
          return (
            <div
              data-grid={layout[index]}
              key={aspect.name}
              id="parent"
              className="flex flex-col grid-item-dark flex-shrink-0 bg-blue-dark rounded text-grey-blue mb-2 text-14 leading-16px overflow-hidden pb-3"
            >
              <div
                className="flex justify-between p-3 rounded-t font-bold text-white uppercase cursor-pointer hover:bg-blue-bright"
                onClick={e => {
                  const target = e.target as HTMLButtonElement

                  if (
                    target &&
                    target.classList.contains('dragHandleSelector')
                  ) {
                    return
                  }

                  const cloneRecords: any = variantStore.recordsDisplayConfig

                  const drawerElement = document.querySelector(
                    `#drawer-${aspect.name}`,
                  )

                  const clientHeight = get(
                    drawerElement?.firstChild,
                    'clientHeight',
                    0,
                  )

                  const openedH = clientHeight * 0.0208 + 1.3

                  setLayout((prev: IGridLayout[]) => {
                    const clonedLayout: any[] = clone(prev)

                    const layoutItemIndex = clonedLayout.findIndex(
                      (aspectItem: any) => aspectItem.i === aspect.name,
                    )

                    clonedLayout[layoutItemIndex].h = cloneRecords[aspect.name]
                      .isOpen
                      ? 1
                      : openedH

                    variantStore.updateRecordsDisplayConfig(
                      clonedLayout[layoutItemIndex].i,
                      clonedLayout[layoutItemIndex].h,
                    )

                    const reflowLayout = clonedLayout.map(
                      (layoutItem, layoutIndex: number) => {
                        if (layoutIndex < layoutItemIndex) {
                          return layoutItem
                        }

                        return {
                          ...layoutItem,
                          y: layoutItem.y + openedH,
                        }
                      },
                    )

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(reflowLayout),
                    )

                    return reflowLayout
                  })
                  variantStore.checkRecodsDisplaying()
                }}
              >
                {aspect.title}
                <div className="flex">
                  {aspect.name === 'view_gen' && <IgvButton />}

                  <Icon
                    name="ArrowsOut"
                    className="dragHandleSelector mr-1 cursor-move hover:text-blue-bright"
                  />
                </div>
              </div>
              <div
                className={cn(
                  'px-3 overflow-x-auto overflow-y-scroll content-child',
                )}
                id={`drawer-${aspect.name}`}
                style={{
                  height: get(layout, aspect.name, 0).h,
                }}
              >
                {aspect.type === 'pre' ? (
                  <PreView
                    {...(aspect as ICommonAspectDescriptor &
                      IPreAspectDescriptor)}
                  />
                ) : (
                  <TableView
                    {...(aspect as ICommonAspectDescriptor &
                      ITableAspectDescriptor)}
                    name={aspect.name}
                  />
                )}
              </div>
            </div>
          )
        })}
      </GridLayout>
    )
  },
)
