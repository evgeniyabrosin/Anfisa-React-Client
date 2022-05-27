import { ComponentType } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { ErrorPage } from '@pages/error/error.page'

export const wrapWithErrorBoundary = (
  pages: Record<string, ComponentType>,
): Record<string, ComponentType> => {
  return Object.fromEntries(
    Object.entries(pages).map(([path, component]) => [
      path,
      withErrorBoundary(component, {
        fallback: <ErrorPage />,
      }),
    ]),
  )
}
