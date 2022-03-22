export const getVariantListForPieChart = (
  filteredVariants: [string, number][],
): [string, number][] => {
  const displayedFieldsNumber = 4
  if (filteredVariants.length <= displayedFieldsNumber) {
    return filteredVariants
  }

  const mainVariantList = filteredVariants.slice(0, displayedFieldsNumber)
  const othersVariantList = filteredVariants.slice(displayedFieldsNumber)

  const othersVariantsQuantity = othersVariantList.reduce(
    (previousValue, variant) => previousValue + variant[1],
    0,
  )

  const othersVaraints: [string, number] = ['Others', othersVariantsQuantity]
  const dataForPieChart = [...mainVariantList, othersVaraints]

  return dataForPieChart
}
