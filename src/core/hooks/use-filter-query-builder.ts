import { useState } from 'react'

import { TStatUnitsQueryBuilder } from '@store/common'

export const useFilterQueryBuilder = (queryBuilder: TStatUnitsQueryBuilder) => {
  const entriesQueryBuilder = Object.entries(queryBuilder)

  const [filterValue, setFilterValue] = useState('')

  const filteredEntriesQueryBuilder = entriesQueryBuilder
    .map(group => {
      const filteredSubGroups = group[1].filter(subGroup => {
        const name = subGroup.name.toLowerCase()
        const fixedFilterValue = filterValue.toLowerCase()

        return name.includes(fixedFilterValue)
      })

      group[1] = filteredSubGroups

      return group
    })
    .filter(group => group[1].length > 0)

  const filteredQueryBuilder = Object.fromEntries(filteredEntriesQueryBuilder)

  return {
    filterValue,
    setFilterValue,
    filteredQueryBuilder,
  }
}
