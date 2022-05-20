import { useMemo, useState } from 'react'

import { TUnitGroups } from '@store/stat-units'

interface IFilteredUnits {
  filterValue: string
  setFilterValue: (value: string) => void
  filteredGroups: TUnitGroups
}

export const useFilteredUnits = (groups: TUnitGroups): IFilteredUnits => {
  const [filterValue, setFilterValue] = useState('')

  const preparedFilterValue = filterValue.toLowerCase()

  const filteredGroups = useMemo(
    () =>
      groups
        .map(group => {
          return {
            ...group,
            attributes: group.units.filter(attr =>
              attr.name.toLowerCase().includes(preparedFilterValue),
            ),
          }
        })
        .filter(group => group.attributes.length > 0),
    [groups, preparedFilterValue],
  )
  return {
    filterValue,
    setFilterValue,
    filteredGroups,
  }
}
