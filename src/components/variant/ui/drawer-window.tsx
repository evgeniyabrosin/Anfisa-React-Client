import { ReactElement, useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import Tooltip from 'rc-tooltip'

import { IGridLayout } from '@declarations'
import { t } from '@i18n'
import {
  ICommonAspectDescriptor,
  IPreAspectDescriptor,
  ITableAspectDescriptor,
  TRecCntResponse,
} from '@service-providers/dataset-level/dataset-level.interface'

const normClass = 'norm'
const normHitClass = 'norm hit'
const noTrHitClass = 'no-tr-hit'

const PreView = ({
  content,
}: ICommonAspectDescriptor & IPreAspectDescriptor): ReactElement => {
  return <pre className="overflow-y-hidden">{content}</pre>
}

interface ITableView extends ICommonAspectDescriptor, ITableAspectDescriptor {
  shouldAddShadow: boolean
}

const TableView = ({
  colhead,
  rows,
  name,
  shouldAddShadow,
}: ITableView): ReactElement => {
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
            {rows?.map((row, index) => {
              if (!row) return <tr key={index} />

              const blueBg = ' p-3 bg-blue-darkHover'
              return (
                <tr key={row.name}>
                  <Tooltip
                    overlay={row.tooltip}
                    placement="bottomLeft"
                    trigger={row.tooltip ? ['hover'] : []}
                  >
                    <td
                      className={cn(
                        'p-3 text-blue-bright whitespace-nowrap sticky left-0',
                        `${shouldAddShadow ? blueBg : ''}`,
                      )}
                    >
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

export const DrawerWindow = observer(
  ({ aspect, layout }: { aspect: TRecCntResponse; layout: IGridLayout[] }) => {
    const getLeftDistance = (element: HTMLDivElement): number | null => {
      const tableNode = element?.children?.[0]?.children?.[0]
      const tbodyNode = tableNode?.children[1]
      const trackedTdNode = tbodyNode?.children?.[0]?.children?.[1]

      if (!trackedTdNode) return null

      return trackedTdNode.getBoundingClientRect().left
    }

    const ref = useRef<HTMLDivElement>(null)
    const [startedLeftDistance, setStartedLeftDistance] = useState<
      number | null
    >(null)
    const [shouldAddShadow, setShouldAddShadow] = useState(false)

    const handleStartScroll = () => {
      if (startedLeftDistance || !ref.current) return

      const currentLeftDistance = getLeftDistance(ref.current)

      if (!currentLeftDistance) return

      const fixedLeftDistance = Math.round(currentLeftDistance)

      setStartedLeftDistance(fixedLeftDistance)
    }

    const handleScroll = () => {
      if (!ref.current) return

      const currentLeftDistance = getLeftDistance(ref.current)

      if (!currentLeftDistance) return

      const fixedCurrentLeftDistance = Math.round(currentLeftDistance)

      if (fixedCurrentLeftDistance !== startedLeftDistance) {
        setShouldAddShadow(true)
      }

      if (fixedCurrentLeftDistance === startedLeftDistance) {
        setShouldAddShadow(false)
      }
    }

    return (
      <ScrollContainer
        hideScrollbars={false}
        onScroll={handleScroll}
        onStartScroll={handleStartScroll}
      >
        <div
          className={cn('py-3 pr-3   content-child')}
          id={`drawer-${aspect.name}`}
          style={{
            height: get(layout, aspect.name, 0).h,
          }}
          ref={ref}
        >
          {aspect.type === 'pre' ? (
            <PreView
              {...(aspect as ICommonAspectDescriptor & IPreAspectDescriptor)}
            />
          ) : (
            <TableView
              {...(aspect as ICommonAspectDescriptor & ITableAspectDescriptor)}
              name={aspect.name}
              shouldAddShadow={shouldAddShadow}
            />
          )}
        </div>
      </ScrollContainer>
    )
  },
)
