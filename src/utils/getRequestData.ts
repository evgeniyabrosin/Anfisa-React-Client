export const getRequestData = (
  target: any,
  selectIndex: number,
  problemGroups: string[],
) => {
  let firstSiblingValue: string
  let secondSiblingValue: string
  const parent = target.parentNode.parentNode
  let requestData: any[] = []

  if (selectIndex === 0) {
    firstSiblingValue = target.parentNode.nextElementSibling.lastChild.value
    secondSiblingValue = parent.lastChild.lastChild.value

    requestData = [
      [target.value, problemGroups[0]],
      [firstSiblingValue, problemGroups[1]],
      [secondSiblingValue, problemGroups[2]],
    ]
  }

  if (selectIndex === 1) {
    firstSiblingValue = target.parentNode.previousElementSibling.lastChild.value
    secondSiblingValue = target.parentNode.nextElementSibling.lastChild.value

    requestData = [
      [firstSiblingValue, problemGroups[0]],
      [target.value, problemGroups[1]],
      [secondSiblingValue, problemGroups[2]],
    ]
  }

  if (selectIndex === 2) {
    firstSiblingValue = parent.firstChild.lastChild.value
    secondSiblingValue =
      target.parentNode.previousElementSibling.lastChild.value

    requestData = [
      [firstSiblingValue, problemGroups[0]],
      [secondSiblingValue, problemGroups[1]],
      [target.value, problemGroups[2]],
    ]
  }

  return requestData
}
