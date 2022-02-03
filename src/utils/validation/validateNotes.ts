import { t } from '@i18n'
import { noFirstSymbolsPattern } from './validationPatterns'

export const validateNotes = (
  note: string,
): { isValid: boolean; error?: string } => {
  if (noFirstSymbolsPattern.test(note)) {
    return { isValid: false, error: t('error.noFirstSymbols') }
  }

  if (note.length > 600) {
    return { isValid: false, error: t('error.tooLongNote') }
  }

  return { isValid: true }
}
