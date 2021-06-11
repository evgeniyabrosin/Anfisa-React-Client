import { ReactElement } from 'react'
import get from 'lodash/get'

import { CopyToClipboard } from '@ui/copy-to-clipboard'
import { CellI } from './cell-interfaces'

export const CellVariant = ({ cell }: CellI): ReactElement => {
  const value = get(cell, 'value', '').split(' ')

  return (
    <div className="text-12 leading-18px">
      <div className="flex">
        <span>{value[0]}</span>
        <CopyToClipboard text={`${value[0]} ${value[1]}`} />
      </div>
      <div>{value[1]}</div>
    </div>
  )
}
