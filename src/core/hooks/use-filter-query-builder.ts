import { useMemo, useState } from 'react'

import { TQueryBuilder, TQueryBuilderAttribute } from '@utils/query-builder'

export const useFilterQueryBuilder = (queryBuilder: TQueryBuilder) => {
  const [filterValue, setFilterValue] = useState('')

  const preparedFilterValue = filterValue.toLowerCase()

  const filteredQueryBuilder = useMemo(
    () =>
      queryBuilder
        .map(group => {
          return {
            ...group,
            attributes: group.attributes.reduce((acc, attr) => {
              const hasPreparedFilterValue = attr.name
                .toLowerCase()
                .includes(preparedFilterValue)

              if (!hasPreparedFilterValue) return acc

              if ('variants' in attr) {
                const hasVariantCounts = attr.variants?.some(
                  ([, variantCounts]) => variantCounts > 0,
                )

                if (!hasVariantCounts) return acc
              }

              acc.push(attr)

              return acc
            }, [] as TQueryBuilderAttribute[]),
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
