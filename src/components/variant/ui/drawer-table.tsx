import { MouseEvent, ReactElement } from 'react'
import cn from 'classnames'
import Tooltip from 'rc-tooltip'

import { t } from '@i18n'
import {
  ICommonAspectDescriptor,
  ITableAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'
import { DrawerClass } from '../drawer.utils'

interface IDrawerTableProps
  extends ICommonAspectDescriptor,
    ITableAspectDescriptor {
  shouldAddShadow: boolean
  filterSelection: string
}

export const DrawerTable = ({
  colhead,
  rows,
  shouldAddShadow,
  filterSelection,
}: IDrawerTableProps): ReactElement => {
  const onMouseDownHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const count = colhead?.[0]?.[1]

  return (
    <div>
      {rows?.length === 0 ? (
        <div className="flex justify-center text-center w-full relative bottom-3">
          {t('variant.noDataToShow')}
        </div>
      ) : (
        <table className="min-w-full">
          <tbody>
            {rows?.map((row, index) => {
              if (!row) return <tr key={index} />

              const blueBg = ' p-3 bg-blue-darkHover'

              const shouldShowCount = count && index === 0

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
                      <span
                        className="cursor-auto"
                        onMouseDownCapture={onMouseDownHandler}
                      >
                        {shouldShowCount
                          ? `${row.title} [${count}]`
                          : row.title}
                      </span>
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
                            : !cell[1]?.includes(DrawerClass.noTrHitClass) &&
                                'text-grey-blue',
                        )}
                      >
                        <span
                          className="cursor-auto"
                          onMouseDownCapture={onMouseDownHandler}
                          dangerouslySetInnerHTML={{ __html: cell[0] }}
                        />
                      </td>
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
