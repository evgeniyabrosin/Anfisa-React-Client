import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'

interface Props {
  genes: string[]
}

export const GeneList = observer(({ genes }: Props) => {
  const handleCheck = (checked: boolean, geneName: string) => {
    if (checked) {
      zoneStore.addGene(geneName)
    } else {
      zoneStore.removeGene(geneName)
    }
  }

  return (
    <div className="mt-5 h-60 overflow-y-scroll">
      {genes.map(gene => (
        <div key={gene} className="flex items-center mb-4">
          <Checkbox
            checked={zoneStore.selectedGenes.includes(gene)}
            className="w-4 h-4"
            onChange={e => handleCheck(e.target.checked, gene)}
          />
          <span className="text-12 ml-1">{gene}</span>
        </div>
      ))}
    </div>
  )
})
