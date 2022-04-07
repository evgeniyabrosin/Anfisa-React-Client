export const getNumericExpression = (data: any[], name: string) => {
  // example of data : [null, true, 20, false] => (name < 20)
  // example of data : [10, true, 20, true] => (10 <= name <= 20)
  // data[0], data[2] are probable values from expression

  if (
    typeof data[0] === 'object' &&
    data[1] &&
    typeof data[2] === 'number' &&
    !data[3]
  ) {
    return `${name} < ${data[2]}`
  }

  if (
    typeof data[0] === 'object' &&
    !data[1] &&
    typeof data[2] === 'number' &&
    !data[3]
  ) {
    return `${name} < ${data[2]}`
  }

  if (
    typeof data[0] === 'object' &&
    data[1] &&
    typeof data[2] === 'number' &&
    data[3]
  ) {
    return `${name} <= ${data[2]}`
  }

  if (
    typeof data[0] === 'object' &&
    !data[1] &&
    typeof data[2] === 'number' &&
    data[3]
  ) {
    return `${name} <= ${data[2]}`
  }

  if (
    typeof data[0] === 'number' &&
    !data[1] &&
    typeof data[2] === 'object' &&
    data[3]
  ) {
    return `${name} > ${data[0]}`
  }

  if (
    typeof data[0] === 'number' &&
    !data[1] &&
    typeof data[2] === 'object' &&
    !data[3]
  ) {
    return `${name} > ${data[0]}`
  }

  if (
    typeof data[0] === 'number' &&
    data[1] &&
    typeof data[2] === 'object' &&
    data[3]
  ) {
    return `${name} >= ${data[0]}`
  }

  if (
    typeof data[0] === 'number' &&
    data[1] &&
    typeof data[2] === 'object' &&
    !data[3]
  ) {
    return `${name} >= ${data[0]}`
  }

  if (
    typeof data[0] === 'number' &&
    !data[1] &&
    typeof data[2] === 'number' &&
    !data[3]
  ) {
    return `${data[0]} < ${name} < ${data[2]}`
  }

  if (
    typeof data[0] === 'number' &&
    data[1] &&
    typeof data[2] === 'number' &&
    !data[3]
  ) {
    return `${data[0]} <= ${name} < ${data[2]}`
  }

  if (
    typeof data[0] === 'number' &&
    !data[1] &&
    typeof data[2] === 'number' &&
    data[3]
  ) {
    return `${data[0]} < ${name} <= ${data[2]}`
  }

  if (
    typeof data[0] === 'number' &&
    data[1] &&
    typeof data[2] === 'number' &&
    data[3] &&
    data[0] === data[2]
  ) {
    return `${name} == ${data[0]}`
  }

  if (
    typeof data[0] === 'number' &&
    data[1] &&
    typeof data[2] === 'number' &&
    data[3]
  ) {
    return `${data[0]} <= ${name} <= ${data[2]}`
  }
}
