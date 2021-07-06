import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Tag } from '@ui/tag'

export const DrawerTags = observer(() => {
  const [isExpandTags, expand, roll] = useToggle(false)

  if (variantStore.tags.length === 0) {
    return <Fragment />
  }

  return (
    <div className="w-72 mr-3 self-center">
      {variantStore.tags.length > 0 && (
        <div
          className={cn('text-white ml-3 flex max-w-xs', {
            'flex-wrap': isExpandTags,
          })}
        >
          {variantStore.tags
            .slice(0, isExpandTags ? variantStore.tags.length : 2)
            .map(tag => (
              <Tag text={tag} key={tag} isActive hideCloseIcon />
            ))}

          {variantStore.tags.length > 2 && (
            <Fragment>
              {isExpandTags ? (
                <span
                  className="text-12 leading-14px font-bold text-blue-bright p-1 cursor-pointer"
                  onClick={roll}
                >
                  {t('general.showLess')}
                </span>
              ) : (
                <Tag
                  text={`+${variantStore.tags.length - 2}`}
                  isActive
                  onClick={expand}
                  hideCloseIcon
                />
              )}
            </Fragment>
          )}
        </div>
      )}
    </div>
  )
})
