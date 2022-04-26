import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { Checkbox } from '@ui/checkbox/checkbox'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface IZoneModalListProps {
  items: string[]
  isGenes?: boolean
  isGenesList?: boolean
  isSamples?: boolean
  isTags?: boolean
}

export const ZoneModalList = observer(
  ({ items, isGenes, isGenesList, isSamples, isTags }: IZoneModalListProps) => {
    const handleCheck = (checked: boolean, name: string) => {
      if (checked) {
        isGenes && zoneStore.addGene(name)
        isGenesList && zoneStore.addGenesList(name)
        isSamples && zoneStore.addSample(name)
        isTags && zoneStore.addLocalTag(name)
      } else {
        isGenes && zoneStore.removeGene(name, 'slow')
        isGenesList && zoneStore.removeGenesList(name, 'slow')
        isSamples && zoneStore.removeSample(name, 'slow')
        isTags && zoneStore.removeLocalTag(name, 'slow')
      }
    }

    return (
      <div className="mt-5 h-60 overflow-y-scroll">
        {items.map(item => {
          const checked =
            (isGenes && zoneStore.localGenes.includes(item)) ||
            (isGenesList && zoneStore.localGenesList.includes(item)) ||
            (isSamples && zoneStore.localSamples.includes(item)) ||
            (isTags && zoneStore.localTags.includes(item))

          return (
            <Checkbox
              key={item}
              checked={checked}
              onChange={e => handleCheck(e.target.checked, item)}
              className="flex items-center mb-4 text-12 font-medium"
            >
              <span data-testid={MainTableDataCy.checkboxListElement}>
                {item}
              </span>
            </Checkbox>
          )
        })}
      </div>
    )
  },
)
