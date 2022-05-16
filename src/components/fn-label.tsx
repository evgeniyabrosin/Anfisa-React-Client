import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'

interface IfFnLabelProps {
  className?: Argument
}

export const FnLabel = observer(
  ({ className }: IfFnLabelProps): ReactElement => {
    return (
      <div
        style={{ width: 18, height: 18 }}
        className={cn(
          'flex items-center justify-center text-12 rounded-sm font-mono text-green-secondary bg-green-light',
          className,
        )}
      >
        {t('dtree.fn')}
      </div>
    )
  },
)
