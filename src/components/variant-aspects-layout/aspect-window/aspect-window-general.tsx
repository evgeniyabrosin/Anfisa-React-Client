import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { AspectWindowBase, IAspectWindowBaseProps } from './aspect-window-base'

export const AspectWindowGeneral = ({
  igvUrl,
  ...windowProps
}: IAspectWindowBaseProps): ReactElement => {
  return (
    <AspectWindowBase
      {...windowProps}
      titleAdornment={
        igvUrl && (
          <Link target="_blank" to={`${Routes.IGV}?${igvUrl}`}>
            <Button
              className="mx-8 whitespace-nowrap"
              text={t('igv.openIgv')}
              size="xs"
            />
          </Link>
        )
      }
    />
  )
}
