import { ReactElement } from 'react'

import { ControlPanelTitle } from './control-panel-title'

interface Props {
  group: string
  variants: Record<string, Record<string, number>>
}

export const FilterItem = ({ group, variants }: Props): ReactElement => {
  const groupItemkeys = Object.keys(variants)

  return (
    <div className="mr-6">
      <ControlPanelTitle title={group} />

      <div>
        {groupItemkeys.map(groupItemKey => {
          const amountValues: number[] = Object.values(variants[groupItemKey])

          return (
            <div key={groupItemKey} className="flex text-12 leading-5">
              <div className="text-white mr-1">{groupItemKey}</div>

              {amountValues.length > 0 && (
                <div className="text-grey-blue">
                  ({amountValues.reduce((prev, cur) => prev + cur, 0)})
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
