import { t } from '@i18n'

export const validateNotes = (
  note: string,
): { isValid: boolean; error?: string } => {
  if (note.length > 600) {
    return { isValid: false, error: t('error.tooLongNote') }
  }

  return { isValid: true }
}
