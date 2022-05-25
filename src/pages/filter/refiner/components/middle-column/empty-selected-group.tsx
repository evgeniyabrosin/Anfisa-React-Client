import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'

type IEmptySelectedGroupProps = {
  className?: Argument
}
export const EmptySelectedGroup = ({
  className,
}: IEmptySelectedGroupProps): ReactElement => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <p className="leading-16px text-grey-blue align-center">
        {t('dtree.selectAttribute')}
      </p>
    </div>
  )
}
