import { useMemo, useState } from 'react'

import { TQueryBuilder } from '@utils/query-builder'

export const useFilterQueryBuilder = (queryBuilder: TQueryBuilder) => {
  const [filterValue, setFilterValue] = useState('')

  const preparedFilterValue = filterValue.toLowerCase()

  const filteredQueryBuilder = useMemo(
    () =>
      queryBuilder
        .map(group => {
          return {
            ...group,
            attributes: group.attributes.filter(attr =>
              attr.name.toLowerCase().includes(preparedFilterValue),
            ),
          }
        })
        .filter(group => group.attributes.length > 0),
    [queryBuilder, preparedFilterValue],
  )
  return {
    filterValue,
    setFilterValue,
    filteredQueryBuilder,
  }
}
