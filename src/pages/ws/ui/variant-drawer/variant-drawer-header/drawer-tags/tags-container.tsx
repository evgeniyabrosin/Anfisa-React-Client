import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Tag } from '@ui/tag'

export const TagsContainer = observer(() => {
  const [isExpandTags, expand, roll] = useToggle(false)

  return (
    <div className="w-auto" style={{ maxWidth: 288 }}>
      {variantStore.checkedTags.length > 0 && (
        <div
          className={cn('text-white flex max-w-xs', {
            'flex-wrap': isExpandTags,
          })}
        >
          {variantStore.checkedTags
            .slice(0, isExpandTags ? variantStore.checkedTags.length : 2)
            .map(tag => (
              <Tag text={tag} key={tag} isActive hideCloseIcon />
            ))}

          {variantStore.checkedTags.length > 2 && (
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
                  text={`+${variantStore.checkedTags.length - 2}`}
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
