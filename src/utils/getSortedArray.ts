import { cloneDeep } from 'lodash'

export const getSortedArray = (selectedData: any[]) => {
  selectedData.map((item: any, index: number) => {
    if (selectedData[index + 1] && item[0] === selectedData[index + 1][0]) {
      selectedData[index].push(selectedData[index + 1][1])
    }

    if (selectedData[index + 2] && item[0] === selectedData[index + 2][0]) {
      selectedData[index].push(selectedData[index + 2][1])
    }
  })

  selectedData.map((_item, index) => {
    if (
      selectedData[index + 1] &&
      selectedData[index][0] === selectedData[index + 1][0]
    ) {
      selectedData[index].length > selectedData[index + 1].length
        ? selectedData.splice(index + 1, 1)
        : selectedData.splice(index, 1)
    }

    if (
      selectedData[index + 2] &&
      selectedData[index][0] === selectedData[index + 2][0]
    ) {
      selectedData[index].length > selectedData[index + 2].length
        ? selectedData.splice(index + 2, 1)
        : selectedData.splice(index, 1)
    }
  })

  selectedData.map((_item, index) => {
    if (
      selectedData[index + 1] &&
      selectedData[index][0] === selectedData[index + 1][0]
    ) {
      selectedData[index].length > selectedData[index + 1].length
        ? selectedData.splice(index + 1, 1)
        : selectedData.splice(index, 1)
    }
  })
  selectedData = selectedData.filter(item => item[0] !== '--')

  const clonedData = cloneDeep(selectedData)

  selectedData.map((item, index) => {
    selectedData[index] = [selectedData[index][0], clonedData[index].slice(1)]
  })

  return selectedData
}
