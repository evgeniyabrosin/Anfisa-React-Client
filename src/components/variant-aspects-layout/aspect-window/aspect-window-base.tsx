import styles from './aspect-window.module.css'

import {
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
  useRef,
} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import cn from 'classnames'

import { useForkRef } from '@core/hooks/use-fork-ref'
import { Icon } from '@ui/icon'
import { IAspectWindowProps } from '@components/variant-aspects-layout/aspect-window/aspect-window.interface'
import { AspectDescriptorTypes } from '@service-providers/dataset-level/dataset-level.interface'
import { AspectPreView } from './aspect-pre-view'
import { AspectTableView } from './aspect-table-view'
import { useScrollShadow } from './aspect-window.utils'

interface IContentRenderFnParams {
  shouldAddShadow: boolean
}

type TContentRenderFn = ({
  shouldAddShadow,
}: IContentRenderFnParams) => ReactNode

const WindowContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(
  (props, ref): ReactElement => (
    <div data-window-content="" ref={ref} {...props} />
  ),
)

WindowContent.displayName = ' WindowContent'

export interface IAspectWindowBaseProps extends IAspectWindowProps {
  rootRef: Ref<HTMLDivElement>
  className?: string
  title?: ReactNode
  titleAdornment?: ReactNode
  content?: TContentRenderFn
}

export const AspectWindowBase = ({
  rootRef,
  className,
  aspect,
  title,
  titleAdornment,
  content: contentRender,
  isOpen,
  isMovable,
  isResizable,
  children,
  onToggle,
  ...divProps
}: IAspectWindowBaseProps): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { shouldAddShadow, handleScroll } = useScrollShadow(contentRef)

  const windowRef = useRef<HTMLDivElement>()
  const ref = useForkRef(rootRef, windowRef)

  let content: ReactNode

  if (contentRender) {
    content = contentRender({ shouldAddShadow })
  } else {
    switch (aspect.type) {
      case AspectDescriptorTypes.Pre:
        content = <AspectPreView aspect={aspect} />
        break
      case AspectDescriptorTypes.Table:
        content = (
          <AspectTableView aspect={aspect} shouldAddShadow={shouldAddShadow} />
        )
        break
    }
  }

  return (
    <div
      ref={ref}
      className={cn(styles.aspectWindow, className)}
      data-window={aspect.name}
      {...divProps}
    >
      <div
        className={cn(
          styles.aspectWindow__title,
          styles.windowTitle,
          isMovable && styles.windowTitle_movable,
        )}
      >
        <div className={styles.windowTitle__label} data-drag-handle={true}>
          {title || aspect.title}
        </div>
        {titleAdornment && (
          <div className={styles.windowTitle__adornment}>{titleAdornment}</div>
        )}
        {onToggle && (
          <button
            className={cn(
              styles.windowTitle__expandButton,
              isOpen && styles.windowTitle__expandButton_open,
            )}
            onClick={() =>
              onToggle({
                name: aspect.name,
                windowEl: windowRef.current,
                state: !isOpen,
              })
            }
          >
            <Icon name="ArrowDownS" />
          </button>
        )}
      </div>
      <ScrollContainer
        hideScrollbars={false}
        onScroll={handleScroll}
        className={cn(
          styles.aspectWindow__content,
          isResizable && styles.aspectWindow__content_resizable,
        )}
        innerRef={contentRef}
        component={WindowContent}
      >
        {content}
      </ScrollContainer>
      {children}
    </div>
  )
}
