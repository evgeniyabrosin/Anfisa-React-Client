import { ISolutionEntryDescription } from '@service-providers/common'

export const filterPresetsData = <T extends ISolutionEntryDescription>(
  presets: T[],
): T[] => {
  const presetComparator = (a: T, b: T): number => {
    if (a.standard !== b.standard) {
      return a.standard ? -1 : 1
    }

    return a.name.localeCompare(b.name)
  }
  presets.sort(presetComparator)

  return presets
}
