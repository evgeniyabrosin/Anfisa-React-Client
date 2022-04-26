import { ReactElement, useRef } from 'react'
import cn, { Argument } from 'classnames'

import useClientHeight from '@core/hooks/use-client-height'
import { t } from '@i18n'

type IEmptySelectedGroupProps = {
  className?: Argument
}
export const EmptySelectedGroup = ({
  className,
}: IEmptySelectedGroupProps): ReactElement => {
  const emptyDivkRef = useRef<any>()

  const emptyBlockHeight = useClientHeight(emptyDivkRef)

  return (
    <div className={cn('w-1/3', className)}>
      <div
        ref={emptyDivkRef}
        className="flex items-center justify-center border border-grey-disabled"
        style={{ height: emptyBlockHeight }}
      >
        <p className="leading-16px text-grey-blue align-center">
          {t('dtree.selectAttribute')}
        </p>
      </div>
    </div>
  )
}
