import { MouseEvent, ReactElement } from 'react'
import cn from 'classnames'
import Tooltip from 'rc-tooltip'

import { t } from '@i18n'
import {
  AspectCellRenderClass,
  ITableAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'

interface IAspectTableViewProps {
  className?: string
  aspect: ITableAspectDescriptor
  shouldAddShadow?: boolean
}

export const AspectTableView = ({
  className,
  aspect,
  shouldAddShadow,
}: IAspectTableViewProps): ReactElement => {
  const { colhead, rows } = aspect

  const onMouseDownHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const count = colhead?.[0]?.[1]

  return (
    <div className={className}>
      {rows?.length === 0 ? (
        <div className="text-center w-full p-2">
          {t('variant.noDataToShow')}
        </div>
      ) : (
        <table className="min-w-full" onMouseDownCapture={onMouseDownHandler}>
          <tbody>
            {rows?.map((row, index) => {
              if (!row) return <tr key={index} />

              const blueBg = 'p-3 bg-blue-darkHover'

              const shouldShowCount = count && index === 0

              return (
                <tr key={row.name}>
                  <Tooltip
                    overlay={row.tooltip}
                    placement="bottomLeft"
                    trigger={row.tooltip ? 'hover' : ''}
                  >
                    <td
                      className={cn(
                        'p-3 text-blue-bright whitespace-nowrap sticky left-0',
                        shouldAddShadow && blueBg,
                      )}
                    >
                      <span className="cursor-auto">
                        {shouldShowCount
                          ? `${row.title} [${count}]`
                          : row.title}
                      </span>
                    </td>
                  </Tooltip>

                  {row.cells.map((cell, cIndex) => (
                    <td
                      key={cIndex}
                      className={cn(
                        'py-3 pr-3 font-normal',
                        cell[0].includes('</a>')
                          ? 'text-blue-bright'
                          : !cell[1]?.includes(AspectCellRenderClass.NoTrHit) &&
                              'text-grey-blue',
                      )}
                    >
                      <span
                        className="cursor-auto"
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
