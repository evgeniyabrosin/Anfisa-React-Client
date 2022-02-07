import { CSSProperties } from 'react'
import { TableCommonProps } from 'react-table'

export const getWidthFromReactTableProps = (
  props: TableCommonProps,
  rule: keyof CSSProperties,
) => {
  const { style } = props

  if (!style) {
    return
  }

  const prop = style[rule]

  if (typeof prop === 'string') {
    return Math.floor(+(prop as string).split('px')[0])
  }

  return Math.floor(prop as number)
}
