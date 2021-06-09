import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { InputSearch } from './input-search'

interface Props {
  title: string
  selectedAmount: number
  searchValue: string
  searchInputPlaceholder?: string
  children: ReactElement
  onClearAll?: () => void
  onClose?: () => void
  onApply?: () => void
  onChange?: (value: string) => void
}

export const PopperTableModal = ({
  title,
  selectedAmount,
  searchValue,
  searchInputPlaceholder,
  children,
  onClearAll,
  onClose,
  onApply,
  onChange,
}: Props) => (
  <div className="bg-white p-4 shadow-card rounded p-1">
    <p className="text-16 text-blue-dark mb-5">{title}</p>

    <InputSearch
      value={searchValue}
      placeholder={searchInputPlaceholder}
      onChange={e => onChange && onChange(e.target.value)}
    />

    <div className="flex justify-between mt-5">
      <span className="text-14 text-grey-blue">{selectedAmount} Selected</span>
      <span
        className="text-12 text-blue-bright leading-14 cursor-pointer"
        onClick={onClearAll}
      >
        {t('general.clearAll')}
      </span>
    </div>

    <div>{children}</div>

    <div className="flex justify-end">
      <Button text={t('general.cancel')} onClick={onClose} />
      <Button text={t('general.apply')} onClick={onApply} />
    </div>
  </div>
)
