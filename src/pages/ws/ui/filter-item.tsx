import { ReactElement } from 'react'

import { ControlPanelTitle } from './control-panel-title'

interface Props {
  group: string
  variants: Record<string, Record<string, number>>
}

export const FilterItem = ({ group, variants }: Props): ReactElement => {
  const groupItemkeys = Object.keys(variants)

  const amountMore = groupItemkeys.length - 2

  return (
    <div className="mr-6">
      <ControlPanelTitle title={group} />

      <div>
        {groupItemkeys.slice(0, 2).map((groupItemKey, index) => {
          const amountValues: number[] = Object.values(variants[groupItemKey])

          return (
            <div
              key={groupItemKey}
              className="flex flex-wrap text-12 leading-5"
            >
              <div className="flex">
                <div className="text-white mr-1">{groupItemKey}</div>

                {amountValues.length > 0 && (
                  <div className="text-grey-blue">
                    ({amountValues.reduce((prev, cur) => prev + cur, 0)})
                  </div>
                )}
              </div>

              {index === 1 && amountMore > 0 && (
                <span className="text-grey-blue w-full">{`+${amountMore} more`}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
