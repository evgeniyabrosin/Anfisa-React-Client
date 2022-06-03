import styles from './filter-refiner.module.css'

import { ReactElement, useEffect } from 'react'
import cn from 'classnames'

import { useModal } from '@core/hooks/use-modal'
import mainTableStore from '@store/ws/main-table.store'
import { FilterRefinerUnits } from './filter-refiner-units'
import { FilterRefinerViewVariants } from './filter-refiner-view-variants'
import { SelectedGroup } from './middle-column/selected-group'
import { QuerySelected } from './right-column/query-selected'

interface IFilterRefinerProps {
  className?: string
}

export const FilterRefiner = ({
  className,
}: IFilterRefinerProps): ReactElement => {
  const [viewVariantsModal, openViewVariantsModal, closeViewVariantsModal] =
    useModal()

  useEffect(() => {
    mainTableStore.memorizeFilterConditions()
  }, [])

  return (
    <div className={cn(styles.filterRefiner, className)}>
      <FilterRefinerUnits className={styles.filterRefiner__units} />

      <SelectedGroup className={styles.filterRefiner__currentAttribute} />

      <QuerySelected
        className={styles.filterRefiner__results}
        onViewVariants={openViewVariantsModal}
      />

      <FilterRefinerViewVariants
        {...viewVariantsModal}
        onClose={closeViewVariantsModal}
      />
    </div>
  )
}
