import styles from './content-code.module.css'

import { memo, ReactElement } from 'react'

import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

interface IContentCodeProps {
  codeCondition: string
  codeResult: string
}

// eslint-disable-next-line react/display-name
export const ContentCode = memo(
  ({ codeCondition, codeResult }: IContentCodeProps): ReactElement => (
    <div className={styles.contentCode}>
      <div
        className={styles['content-code__wrapper']}
        data-testid={DecisionTreesResultsDataCy.contentEditor}
      >
        <div dangerouslySetInnerHTML={{ __html: codeCondition }} />

        <div
          dangerouslySetInnerHTML={{ __html: codeResult }}
          className={styles['content-code__result']}
        />
      </div>
    </div>
  ),
)
