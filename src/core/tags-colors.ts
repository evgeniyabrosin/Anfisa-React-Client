import md5 from 'md5'

export const tagsColors = [
  '#8FD6F8',
  '#FDD500',
  '#B6D6BA',
  '#C81E72',
  '#3C59DC',
  '#ECCBC8',
  '#A87FF6',
  '#E4DA3B',
  '#167909',
  '#8F14E4',
]

class TagsColorMap {
  static colorsMap: { name: string; color: string }[] = []

  static getColor(name: string): string {
    const tag = this.colorsMap.find(coloredTag => coloredTag.name === name)

    if (tag) {
      return tag.color
    }

    return this.addColoredTag(name)
  }

  static addColoredTag(name: string): string {
    const color = tagsColors[this.colorsMap.length] || this.generateColor(name)

    this.colorsMap.push({ name, color })

    return color
  }

  static generateColor(name: string): string {
    const hash = md5(name)
    const hex = '#' + hash.slice(0, 6)

    return hex
  }
}

export function generateTagColor(value: string): string {
  return TagsColorMap.getColor(value)
}
