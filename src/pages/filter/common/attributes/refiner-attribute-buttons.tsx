import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'

interface IRefinerAttributeButtonsProps {
  handleClear: () => void
  handleSave: () => void
  isBlockAddBtn: boolean
  initialEnumVariants: string[] | undefined
}

export const RefinerAttributeButtons = observer(
  ({
    handleClear,
    handleSave,
    isBlockAddBtn,
    initialEnumVariants,
  }: IRefinerAttributeButtonsProps): ReactElement => {
    return (
      <div className="flex items-center justify-end mt-2 pb-[40px]">
        <Button
          variant="secondary"
          text={t('general.clear')}
          onClick={handleClear}
          className="px-5 mr-2"
        />

        <Button
          text={
            initialEnumVariants
              ? t('dtree.saveChanges')
              : t('dtree.addAttribute')
          }
          onClick={handleSave}
          disabled={isBlockAddBtn}
        />
      </div>
    )
  },
)
