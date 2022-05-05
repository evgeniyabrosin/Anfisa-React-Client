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
      <div
        className="mt-5 overflow-y-auto"
        style={{ height: 'auto', maxHeight: 240 }}
      >
        {items.map((itemName, index) => {
          const checked =
            (isGenes && zoneStore.localGenes.includes(itemName)) ||
            (isGenesList && zoneStore.localGenesList.includes(itemName)) ||
            (isSamples && zoneStore.localSamples.includes(itemName)) ||
            (isTags && zoneStore.localTags.includes(itemName))
          return (
            <Checkbox
              key={itemName + index}
              checked={!!checked}
              onChange={e => handleCheck(e.target.checked, itemName)}
              id={itemName + index}
              datatestId={MainTableDataCy.checkboxListElement}
              className="mb-2 text-12"
            >
              {itemName}
            </Checkbox>
          )
        })}
      </div>
    )
  },
)
