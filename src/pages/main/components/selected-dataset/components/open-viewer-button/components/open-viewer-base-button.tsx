import { ReactElement, RefObject } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DatasetInfoDataCy } from '@components/data-testid/dataset-info.cy'

interface IOpenViewerBaseButtonProps {
  isOpen?: boolean
  refEl: RefObject<HTMLButtonElement> | null
  onClick?: () => void
}

export const OpenViewerBaseButton = ({
  isOpen,
  refEl,
  ...rest
}: IOpenViewerBaseButtonProps): ReactElement => (
  <Button
    text={t('home.openInViewer')}
    dataTestId={DatasetInfoDataCy.openInViewer}
    refEl={refEl}
    size="md"
    onClick={rest.onClick}
    {...rest}
    append={
      <Icon
        name="Arrow"
        className={cn(
          'transform transition-transform',
          isOpen ? 'rotate-90' : '-rotate-90',
        )}
      />
    }
  />
)
