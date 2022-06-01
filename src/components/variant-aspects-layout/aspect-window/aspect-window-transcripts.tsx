import { ReactElement, useMemo, useState } from 'react'

import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import {
  AspectCellRenderClass,
  ITableAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'
import { AspectWindowBase, IAspectWindowBaseProps } from './aspect-window-base'

export const AspectWindowTranscripts = ({
  aspect: aspectProp,
  isOpen,
  ...restProps
}: IAspectWindowBaseProps): ReactElement => {
  const aspect = aspectProp as ITableAspectDescriptor
  const [isSelectionOnlyShown, setSelectionOnlyShown] = useState(false)

  const preparedAspect = useMemo(() => {
    return isSelectionOnlyShown
      ? {
          ...aspect,
          rows: aspect.rows.map(row => ({
            ...row,
            cells: row.cells.filter(cell =>
              cell[1]?.split(' ').includes(AspectCellRenderClass.Hit),
            ),
          })),
        }
      : aspect
  }, [aspect, isSelectionOnlyShown])

  return (
    <AspectWindowBase
      titleAdornment={
        isOpen && (
          <label className="mx-8 whitespace-nowrap flex items-center cursor-pointer">
            <Checkbox
              checked={isSelectionOnlyShown}
              onChange={event => {
                setSelectionOnlyShown(event.target.checked)
              }}
            >
              <span className="text-xs">{t('variant.showSelectionOnly')}</span>
            </Checkbox>
          </label>
        )
      }
      aspect={preparedAspect}
      isOpen={isOpen}
      {...restProps}
    />
  )
}
