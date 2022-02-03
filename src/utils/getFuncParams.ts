export const getFuncParams = (groupName: string, groupData: any) => {
  if (Object.keys(groupData).length === 0) return '...'

  let string = ''

  Object.entries(groupData).map((item: any) => {
    if (groupName === 'Inheritance_Mode') {
      string += `${item[0]} = [${item[1].toString().split(',').join(', ')}]`
    }

    if (groupName === 'Compound_Het') {
      string += `${item[0]} = ${item[1]}`
    }

    if (groupName === 'Custom_Inheritance_Mode') {
      string += `${item[0]} = {${Object.entries(item[1]).map((elem: any) => {
        return ` "${elem[0]}" : ["${elem[1]
          .toString()
          .split(',')
          .join('", "')}"]`
      })}}`
    }

    if (groupName === 'Compound_Request' && item[0] === 'request') {
      string += `${item[0]} = [${item[1].map((elem: any) => {
        return ` [ ${elem[0]}, {${Object.entries(elem[1]).map(
          (subElem: any) => {
            return ` "${subElem[0]}" : ["${subElem[1]
              .toString()
              .split(',')
              .join('", "')}"]`
          },
        )} } ] `
      })}]`
    }
  })

  return string
}
