import styles from './view-variants-window.module.css'

import React, { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { viewVariantsStore } from './store'
import { VariantContent } from './variant-content'
import { VariantsList } from './variants-list'

interface IViewVariantsWindowProps {
  state: string
  onClose: () => void
}

export const ViewVariantsWindow = observer(
  ({ state, onClose }: IViewVariantsWindowProps): ReactElement => {
    const {
      dsList: { isLoading, status },
      record,
      selectedVariant,
    } = viewVariantsStore

    return (
      <div className={cn(styles.viewVariants, styles[`viewVariants_${state}`])}>
        {isLoading ? (
          <div className={styles.viewVariants__loading}>{status}</div>
        ) : (
          <>
            <VariantsList className={styles.viewVariants__list} />
            <VariantContent
              className={styles.viewVariants__content}
              title={
                <span
                  dangerouslySetInnerHTML={{
                    __html: selectedVariant?.lb ?? '',
                  }}
                />
              }
              onClose={onClose}
              aspects={record.aspects}
              igvUrl={record.igvUrl}
              isLoading={record.isLoading}
            />
          </>
        )}
      </div>
    )
  },
)
