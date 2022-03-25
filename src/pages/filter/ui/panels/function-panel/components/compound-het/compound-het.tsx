import React, { ReactElement, useEffect } from 'react'
import { Option } from 'react-dropdown'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import compoundHetStore, {
  CompoundHetSelectOptions,
} from './compound-het.store'

export const CompundHet = observer((): ReactElement => {
  const { cachedValues, initialApprox } = compoundHetStore

  const { simpleVariants } = functionPanelStore

  useEffect(() => {
    compoundHetStore.getStatFuncStatusAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <div className="text-red-secondary">
        {compoundHetStore.statFuncStatus}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2 text-18 leading-14px">Approx:</span>

          <DropDown
            value={initialApprox}
            options={CompoundHetSelectOptions}
            onSelect={(arg: Option) => compoundHetStore.handleChangeApprox(arg)}
          />
        </div>

        <AllNotMods
          isNotModeChecked={compoundHetStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={
            simpleVariants ? simpleVariants.length === 0 : true
          }
          toggleNotMode={() => compoundHetStore.setCurrentMode(ModeTypes.Not)}
        />
      </div>

      <div className="mt-4">
        <DisabledVariantsAmount variants={simpleVariants} disabled={true} />
      </div>

      <PanelButtons
        onSubmit={() => compoundHetStore.handleSumbitCondtions()}
        resetFields={() => compoundHetStore.handleResetFields()}
        disabled={!simpleVariants}
        selectedFilterValue={'Proband'}
      />
    </React.Fragment>
  )
})
