import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'

interface IProps {
  handleDeleteInstruction: () => void
  handleClose: () => void
  handleSaveChanges: () => void
  disabled: any
}

export const EditModalButtons = observer(
  ({
    handleDeleteInstruction,
    handleClose,
    disabled,
    handleSaveChanges,
  }: IProps) => (
    <div className="flex justify-between items-center">
      <Button
        text={t('dtree.deleteAttribute')}
        hasBackground={false}
        className="text-black border-red-secondary hover:text-white hover:bg-red-secondary"
        onClick={handleDeleteInstruction}
      />

      <div className="flex">
        <Button
          text={t('general.cancel')}
          hasBackground={false}
          className="mr-2 text-black hover:bg-blue-bright hover:text-white"
          onClick={handleClose}
        />

        <div className="relative">
          <Button
            disabled={disabled}
            text={t('dtree.saveChanges')}
            onClick={handleSaveChanges}
          />
        </div>
      </div>
    </div>
  ),
)
