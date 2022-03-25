import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Select } from '@ui/select'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import compoundRequestStore from './compound-request.store'

const approxOptions = [
  'shared transcript',
  'shared gene',
  'non-intersecting transcripts',
]

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

interface IAprroxAndStateProps {
  simpleVariants: string[]
}

export const AprroxAndState = ({
  simpleVariants,
}: IAprroxAndStateProps): ReactElement => (
  <div className="flex justify-between items-center w-full mt-4 text-14">
    <div className="flex">
      <div className="flex items-center">
        <span className="mr-2 text-18 leading-14px">{'Approx:'}</span>

        <Select
          value={approxOptions[2]}
          options={approxOptions}
          disabled={true}
        />
      </div>

      <div className="flex items-center ml-3">
        <span>{t('dtree.state')}</span>

        <Select
          options={['-current-']}
          value="-current-"
          className="w-full ml-2"
          disabled={true}
        />
      </div>
    </div>

    <AllNotMods
      isNotModeChecked={compoundRequestStore.currentMode === ModeTypes.Not}
      isNotModeDisabled={simpleVariants ? simpleVariants.length === 0 : true}
      toggleNotMode={() => compoundRequestStore.setCurrentMode(ModeTypes.Not)}
    />
  </div>
)
