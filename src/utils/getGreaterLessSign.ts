export const getGreaterLessSign = (data: any[]) => {
  const preFilter = data.filter((item: any) => typeof item !== 'number')

  const filterData: string[] = []

  preFilter.forEach((item: any) => {
    !item ? filterData.push('null') : filterData.push(item.toString())
  })

  let sign: any

  if (filterData.join() === 'null,true,null') sign = '<'

  if (filterData.join() === 'null,null,true') sign = '>'

  if (filterData.join() === 'null,true,true') sign = '<='

  if (filterData.join() === 'true,null,true') sign = '>='

  return sign
}
