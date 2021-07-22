import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'

interface Props {
  samples: string[]
}

export const SampleList = observer(({ samples }: Props) => {
  const handleCheck = (checked: boolean, sampleName: string) => {
    if (checked) {
      zoneStore.addSample(sampleName)
    } else {
      zoneStore.removeSample(sampleName)
    }
  }

  return (
    <div className="mt-5 h-60 overflow-y-scroll">
      {samples.map(sample => (
        <div key={sample} className="flex items-center mb-4">
          <Checkbox
            checked={zoneStore.selectedSamples.includes(sample)}
            className="w-4 h-4"
            onChange={e => handleCheck(e.target.checked, sample)}
          />
          <span className="text-12 ml-1">{sample}</span>
        </div>
      ))}
    </div>
  )
})
