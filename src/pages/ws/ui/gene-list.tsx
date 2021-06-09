import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
interface Props {
  genes: string[]
}

export const GeneList = observer(({ genes }: Props) => {
  const handleCheck = (checked: boolean, geneName: string) => {
    if (checked) {
      datasetStore.addGene(geneName)
    } else {
      datasetStore.removeGene(geneName)
    }
  }

  return (
    <div className="mt-5">
      {genes.map(gene => (
        <div key={gene} className="flex items-center mb-4">
          <Checkbox
            checked={datasetStore.selectedGenes.includes(gene)}
            className="w-4 h-4"
            onChange={e => handleCheck(e.target.checked, gene)}
          />
          <span className="text-12 text-black ml-1">{gene}</span>
        </div>
      ))}
    </div>
  )
})
