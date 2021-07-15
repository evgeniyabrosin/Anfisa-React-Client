import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button, ButtonProps } from '@ui/button'
import { Icon } from '@ui/icon'

type Props = ButtonProps & {
  isOpen?: boolean
}

export const FilterButton = observer(
  ({ isOpen, refEl, className, ...rest }: Props): ReactElement => (
    <Button
      text={filterStore.actionName || t('filter.actions')}
      refEl={refEl}
      size="md"
      icon={<Icon name="Arrow" className="transform -rotate-90" />}
      hasBackground={false}
      className={cn('text-white mt-auto ml-2 w-24 rounded-2xl', className)}
      onClick={rest.onClick}
    />
  ),
)
