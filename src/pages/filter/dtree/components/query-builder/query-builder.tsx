import styles from './query-builder.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { DtreeUnitsList } from '@pages/filter/dtree/components/dtree-units-list'
import { QueryBuilderTree } from './query-builder-tree'

interface IQueryBuilderProps {
  className?: string
}

export const QueryBuilder = ({
  className,
}: IQueryBuilderProps): ReactElement => {
  return (
    <div className={cn(styles.queryBuilder, className)}>
      <DtreeUnitsList isModal={false} className={styles.queryBuilder__units} />

      <QueryBuilderTree className={styles.queryBuilder__tree} />
    </div>
  )
}
