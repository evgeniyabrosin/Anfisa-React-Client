import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { TextEditorDialog } from '../modals/components/text-editor-dialog'

export const TextEditorButton = () => {
  const [textEditorDialog, openTextEditorDialog, closeTextEditorDialog] =
    useModal()
  const { isOpen } = textEditorDialog

  return (
    <>
      <Button
        text={t('dtree.textEditor')}
        size="md"
        variant="secondary-dark"
        onClick={openTextEditorDialog}
        dataTestId={DecisionTreesMenuDataCy.textEditor}
      />

      <TextEditorDialog onClose={closeTextEditorDialog} isOpen={isOpen} />
    </>
  )
}
