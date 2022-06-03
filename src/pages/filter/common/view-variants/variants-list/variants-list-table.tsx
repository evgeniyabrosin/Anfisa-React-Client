import styles from './variants-list.module.css'

import React, { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { ReturnedVariantsDataCy } from '@components/data-testid/returned-variants'
import { IRecordDescriptor } from '@service-providers/common'

interface IVariantsListTableProps {
  className?: string
  variants: IRecordDescriptor[]
  selectedVariantIndex: number
  onChangeVariant: (index: number) => void
}

export const VariantsListTable = ({
  className,
  variants,
  selectedVariantIndex,
  onChangeVariant,
}: IVariantsListTableProps): ReactElement => {
  return (
    <table className={cn(styles.variantsTable, className)}>
      <thead className={styles.variantsTable__head}>
        <tr>
          <th
            className={cn(
              styles.variantsTable__cell,
              styles.variantsTable__cell_head,
            )}
          >
            {t('viewVariants.gene')}
          </th>
          <th
            className={cn(
              styles.variantsTable__cell,
              styles.variantsTable__cell_head,
            )}
          >
            {t('viewVariants.variant')}
          </th>
        </tr>
      </thead>

      <tbody>
        {variants.map((variant, index) => {
          const parts = variant.lb
            .split(/[[\]]/)
            .filter(Boolean)
            .map(el => el.trim())
          const [gene, variantB] = parts

          return (
            <tr
              data-testid={ReturnedVariantsDataCy.sampleButton}
              key={variant.no}
              className={cn(
                styles.variantsTable__row,
                index === selectedVariantIndex &&
                  styles.variantsTable__row_active,
              )}
              onClick={() => onChangeVariant(index)}
            >
              <td
                className={styles.variantsTable__cell}
                dangerouslySetInnerHTML={{ __html: gene }}
              />

              <td
                className={styles.variantsTable__cell}
                dangerouslySetInnerHTML={{ __html: variantB }}
              />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
