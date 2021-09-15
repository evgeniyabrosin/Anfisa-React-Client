export const getGreaterLessSign = (data: any[]) => {
  const preFilter = data.filter((item: any) => typeof item !== 'number')

  const filterData: string[] = []

  preFilter.forEach((item: any) => {
    !item ? filterData.push('null') : filterData.push(item.toString())
  })

  if (filterData.join() === 'null,true,null') return '<'

  if (filterData.join() === 'null,null,true') return '>'

  if (filterData.join() === 'null,true,true') return '<='

  if (filterData.join() === 'true,null,true') return '>='
}
