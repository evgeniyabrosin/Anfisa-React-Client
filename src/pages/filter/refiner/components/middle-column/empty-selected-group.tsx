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
    <div className={cn('w-1/3 h-full', className)}>
      <div className="flex items-center justify-center border border-grey-disabled h-full">
        <p className="leading-16px text-grey-blue align-center">
          {t('dtree.selectAttribute')}
        </p>
      </div>
    </div>
  )
}
