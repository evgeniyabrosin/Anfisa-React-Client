export type Color = [number, number, number, number]

export const parseColor = (color: string): Color => {
  if (color.startsWith('#')) {
    return [
      parseInt(color.slice(1, 3), 16) / 255,
      parseInt(color.slice(3, 5), 16) / 255,
      parseInt(color.slice(5), 16) / 255,
      1,
    ]
  } else if (color.startsWith('rgb')) {
    const arr = color
      .substring(color.indexOf('(') + 1, color.indexOf(')'))
      .split(/[\s,\\]+/)
      .filter(Boolean)

    return [
      parseInt(arr[0]),
      parseInt(arr[1]),
      parseInt(arr[2]),
      arr[3] != null ? parseFloat(arr[3]) : 1,
    ]
  }

  throw new Error('unsupported color format')
}

export const interpolateColor = (c1: Color, c2: Color, pos: number): Color => {
  return c1.map((c, i) => c + (c2[i] - c) * pos) as Color
}

export const color2str = (c: Color): string => {
  return `rgba(${Math.floor(c[0] * 255)}, ${Math.floor(
    c[1] * 255,
  )}, ${Math.floor(c[2] * 255)}, ${c[3]})`
}
