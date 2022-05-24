import { FC } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'

interface IFnLabelProps {
  className?: Argument
  isActive?: boolean
}

export const FnLabel: FC<IFnLabelProps> = ({ isActive, className }) => {
  return (
    <div
      style={{ width: 18, height: 18 }}
      className={cn(
        'flex items-center justify-center text-12 rounded-sm font-mono',
        isActive
          ? 'text-blue-bright bg-blue-medium'
          : 'text-green-secondary bg-green-light',
        className,
      )}
    >
      {t('dtree.fn')}
    </div>
  )
}
