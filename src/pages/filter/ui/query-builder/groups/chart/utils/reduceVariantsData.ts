import { TVariant } from '@service-providers/common'

export const reduceVariantsData = (
  data: TVariant[],
  limit: number,
): TVariant[] => {
  if (data.length <= limit) {
    return data
  }

  const slicedIndex = limit - 1

  return data
    .slice(0, slicedIndex)
    .concat([
      [
        'Other',
        data.reduce(
          (prev, value, index) =>
            index >= slicedIndex ? prev + value[1] : prev,
          0,
        ),
      ],
    ])
}
