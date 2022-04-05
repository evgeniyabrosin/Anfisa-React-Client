import { IAttributeDescriptors } from '@service-providers/dataset-level/dataset-level.interface'

export const findElementInRow = (
  rows: IAttributeDescriptors[],
  rowName: string,
): string => {
  const currentRow = rows.find(element => element?.name === rowName)
  const currentElement = currentRow?.cells[0][0] ?? ''

  return currentElement
}
