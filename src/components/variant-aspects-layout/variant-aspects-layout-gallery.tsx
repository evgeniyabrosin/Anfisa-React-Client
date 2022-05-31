import styles from './variant-aspects-layout.module.css'

import { ReactElement, useMemo } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { AspectWindow } from '@components/variant-aspects-layout/aspect-window'
import { IVariantAspectsLayoutGalleryProps } from './variant-aspects-layout.interface'

export const VariantAspectsLayoutGallery = ({
  className,
  aspects,
  activeAspect: activeAspectProp,
  onChangeActiveAspect,
  igvUrl,
}: IVariantAspectsLayoutGalleryProps): ReactElement => {
  const activeAspectIndex = useMemo(
    () =>
      Math.max(
        aspects.findIndex(aspect => aspect.name === activeAspectProp),
        0,
      ),
    [aspects, activeAspectProp],
  )

  const currentAspect = aspects[activeAspectIndex]

  return (
    <div className={cn(styles.galleryLayout, className)}>
      <div className={styles.galleryLayout__current}>
        {currentAspect && (
          <AspectWindow
            className={styles.aspectWindow}
            isOpen
            aspect={currentAspect}
            igvUrl={igvUrl}
          />
        )}
      </div>
      <div className={cn(styles.galleryLayout__buttons, styles.buttonsGrid)}>
        {aspects.map((aspect, index) =>
          index !== activeAspectIndex ? (
            <div key={aspect.name} className={styles.buttonsGrid__cell}>
              <button
                className={styles.aspectButton}
                onClick={() => onChangeActiveAspect(aspect.name)}
              >
                <span className={styles.aspectButton__title}>
                  {aspect.title}
                </span>
                <Icon name="Expand" size={16} />
              </button>
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}
