import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'

type Props = {
  className?: Argument
}
export const EmptySelectedGroup = ({ className }: Props): ReactElement => (
  <div className={cn('w-1/3', className)}>
    <div
      className="flex items-center justify-center border border-grey-disabled"
      style={{ height: 'calc(100vh - 203px)' }}
    >
      <p className="leading-16px text-grey-blue align-center">
        {t('dtree.selectAttribute')}
      </p>
    </div>
  </div>
)
