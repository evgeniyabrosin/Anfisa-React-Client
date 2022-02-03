import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button, ButtonProps } from '@ui/button'
import { Icon } from '@ui/icon'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'

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
      variant="secondary-dark"
      className={cn('mt-auto ml-2', className)}
      dataTestId={DecisionTreesMenuDataCy.decisionActions}
      onClick={rest.onClick}
    />
  ),
)
