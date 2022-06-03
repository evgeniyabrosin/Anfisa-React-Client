import styles from './variants-list.module.css'

import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Radio } from '@ui/radio'
import { VariantsListTable } from '@pages/filter/common/view-variants/variants-list/variants-list-table'
import { viewVariantsStore } from '../store'

interface IVariantsListProps {
  className?: string
}

export const VariantsList = observer(({ className }: IVariantsListProps) => {
  const {
    viewMode,
    hasRecords,
    hasSamples,
    variants,
    variantIndex,
    setVariantIndex,
  } = viewVariantsStore

  return (
    <div className={cn(styles.variantsList, className)}>
      <div className={styles.variantsList__modes}>
        <Radio
          className="mr-4"
          onChange={() => viewVariantsStore.setViewMode('records')}
          disabled={!hasRecords}
          checked={viewMode === 'records'}
        >
          {t('viewVariants.fullList')}
        </Radio>
        <Radio
          onChange={() => viewVariantsStore.setViewMode('samples')}
          disabled={!hasSamples}
          checked={viewMode === 'samples'}
        >
          {t('viewVariants.samples25')}
        </Radio>
      </div>
      <div className={styles.variantsList__table}>
        <VariantsListTable
          variants={variants}
          selectedVariantIndex={variantIndex}
          onChangeVariant={setVariantIndex}
        />
      </div>
    </div>
  )
})
