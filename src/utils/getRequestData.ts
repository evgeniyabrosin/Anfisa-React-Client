export const getRequestData = (
  target: any,
  selectIndex: number,
  attrData: any,
) => {
  let firstSiblingValue: string
  let secondSiblingValue: string
  const parent = target.parentNode.parentNode
  let requestData: any[] = []

  if (selectIndex === 0) {
    firstSiblingValue = target.parentNode.nextElementSibling.lastChild.value
    secondSiblingValue = parent.lastChild.lastChild.value

    requestData = [
      [target.value, attrData.family[0]],
      [firstSiblingValue, attrData.family[1]],
      [secondSiblingValue, attrData.family[2]],
    ]
  }

  if (selectIndex === 1) {
    firstSiblingValue = target.parentNode.previousElementSibling.lastChild.value
    secondSiblingValue = target.parentNode.nextElementSibling.lastChild.value

    requestData = [
      [firstSiblingValue, attrData.family[0]],
      [target.value, attrData.family[1]],
      [secondSiblingValue, attrData.family[2]],
    ]
  }

  if (selectIndex === 2) {
    firstSiblingValue = parent.firstChild.lastChild.value
    secondSiblingValue =
      target.parentNode.previousElementSibling.lastChild.value

    requestData = [
      [firstSiblingValue, attrData.family[0]],
      [secondSiblingValue, attrData.family[1]],
      [target.value, attrData.family[2]],
    ]
  }

  return requestData
}
