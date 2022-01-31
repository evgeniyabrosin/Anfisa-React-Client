import { createIntl, createIntlCache } from 'react-intl'
import isString from 'lodash/isString'

import { en } from './locales/en'

interface NestedMessages {
  [key: string]: string | NestedMessages
}

const flattenMessages = (
  nestedMessages: NestedMessages,
  prefix = '',
): Record<string, string> =>
  Object.keys(nestedMessages).reduce(
    (acc: Record<string, string>, key: string): Record<string, string> => {
      const value = nestedMessages[`${key}`]
      const prefixedKey = prefix ? `${prefix}.${key}` : key

      if (isString(value)) {
        acc[`${prefixedKey}`] = value
      } else {
        Object.assign(acc, flattenMessages(value, prefixedKey))
      }

      return acc
    },
    {},
  )

const messages: { [key: string]: Record<string, string> } = {
  en: flattenMessages(en),
}

export const locale = 'en'

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache()

export const intl = createIntl(
  {
    locale,
    messages: messages[`${locale}`],
  },
  cache,
)

export const t = (id: string, values = {}): string =>
  // eslint-disable-next-line formatjs/enforce-default-message
  intl.formatMessage({ id }, values)
