import { ReactElement } from 'react'
import { Argument } from 'classnames'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ViewTypeEnum } from '@core/enum/view-type-enum'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { InputSearch } from '@components/input-search'
import { FilterMods } from '@pages/ws/ui/table/filter-mods'
import { PopupCard } from './popup-card/popup-card'

interface Props {
  title?: string
  selectedAmount?: number
  searchValue: string
  searchInputPlaceholder?: string
  viewType?: ViewTypeEnum
  children: ReactElement
  onSelectAll?: () => void
  onClearAll?: () => void
  onClose?: () => void
  onApply?: () => void
  setViewType?: (viewType: ViewTypeEnum) => void
  onChange?: (value: string) => void
  isGenes?: boolean
  isGenesList?: boolean
  isSamples?: boolean
  isTags?: boolean
  isNotSearchable?: boolean
  notShowSelectedPanel?: boolean
  className?: Argument
}

export const PopperTableModal = observer(
  ({
    title,
    selectedAmount,
    searchValue,
    searchInputPlaceholder,
    viewType,
    children,
    onSelectAll,
    onClearAll,
    onClose,
    onApply,
    onChange,
    isGenes,
    isGenesList,
    isSamples,
    isTags,
    isNotSearchable,
    notShowSelectedPanel,
    className,
  }: Props) => {
    const defineClearFilter = () => {
      isGenes && zoneStore.unselectAllGenes()
      isGenesList && zoneStore.unselectAllGenesList()
      isSamples && zoneStore.unselectAllSamples()
      isTags && zoneStore.unselectAllTags()
    }

    const defintSelectedAmount = () => {
      if (isGenes) return toJS(zoneStore.localGenes).length

      if (isGenesList) return toJS(zoneStore.localGenesList).length

      if (isSamples) return toJS(zoneStore.localSamples).length

      if (isTags) return toJS(zoneStore.localTags).length
    }

    const handleClose = () => {
      defineClearFilter()

      onClose && onClose()
    }

    const handleApply = () => {
      zoneStore.submitTagsMode()

      onApply && onApply()
    }

    return (
      <PopupCard
        className={className}
        title={title ?? ''}
        onClose={handleClose}
        onApply={handleApply}
        shouldCloseOnOutsideClick={true}
      >
        <div className="px-4 pt-4">
          {!isNotSearchable && (
            <InputSearch
              value={searchValue}
              placeholder={searchInputPlaceholder}
              onChange={e => onChange && onChange(e.target.value)}
            />
          )}
          {!notShowSelectedPanel && (
            <div className="flex justify-between mt-5">
              {viewType ? (
                <span className="text-14 text-grey-blue">
                  {selectedAmount} {'Selected'}
                </span>
              ) : (
                <span className="text-14 text-grey-blue">
                  {defintSelectedAmount() || 0} {'Selected'}
                </span>
              )}

              <span className="text-12 text-blue-bright leading-14">
                {onSelectAll && (
                  <span className="cursor-pointer mr-3" onClick={onSelectAll}>
                    {t('general.selectAll')}
                  </span>
                )}
                <span className="cursor-pointer" onClick={onClearAll}>
                  {t('general.clearAll')}
                </span>
              </span>
            </div>
          )}
          {isTags && <FilterMods />}
        </div>
        <div className="w-full pl-4">{children}</div>
      </PopupCard>
    )
  },
)
