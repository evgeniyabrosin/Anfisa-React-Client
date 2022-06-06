import styles from './variant-content.module.css'

import React, { ReactElement, ReactNode, useState } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { Loader } from '@components/loader'
import { VariantAspectsLayoutGallery } from '@components/variant-aspects-layout'
import { TAspectDescriptor } from '@service-providers/dataset-level'

interface IVariantContentProps {
  className?: string
  title: ReactNode
  onClose: () => void
  isLoading?: boolean
  aspects: TAspectDescriptor[]
  igvUrl?: string
}

export const VariantContent = ({
  className,
  title,
  onClose,
  isLoading,
  aspects,
  igvUrl,
}: IVariantContentProps): ReactElement => {
  const [activeAspect, setActiveAspect] = useState('')

  return (
    <div className={cn(styles.variantContent, className)}>
      <div className={styles.variantContent__header}>
        <div className={styles.variantContent__title}>{title}</div>
        <button className={styles.variantContent__close}>
          <Icon name="Close" onClick={onClose} size={16} />
        </button>
      </div>
      {isLoading ? (
        <Loader className={styles.variantContent__aspects} />
      ) : (
        <VariantAspectsLayoutGallery
          className={styles.variantContent__aspects}
          activeAspect={activeAspect}
          onChangeActiveAspect={setActiveAspect}
          aspects={aspects}
          igvUrl={igvUrl}
        />
      )}
    </div>
  )
}
