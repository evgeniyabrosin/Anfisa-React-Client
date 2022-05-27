import styles from './query-builder-tree.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { QueryBuilderResults } from './query-builder-results'
import { QueryBuilderTreeHeader } from './query-builder-tree-header'
import { QueryBuilderTreeView } from './query-builder-tree-view'

interface IQueryBuilderTreeProps {
  className?: string
}

export const QueryBuilderTree = ({
  className,
}: IQueryBuilderTreeProps): ReactElement => {
  return (
    <div className={cn(styles.tree, className)}>
      <QueryBuilderResults className={styles.tree__results} />
      <QueryBuilderTreeHeader className={styles.tree__header} />
      <QueryBuilderTreeView className={styles.tree__view} />
    </div>
  )
}
