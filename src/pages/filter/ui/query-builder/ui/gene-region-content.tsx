import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Input } from '@ui/input'
import modalGeneRegionStore from '../../modal-edit/components/modal-gene-region/modal-gene-region.store'
import { AllNotMods } from './all-not-mods'
import { DisabledVariantsAmount } from './disabled-variants-amount'

interface IProps {
  locusCondition: string
  validateValue: (e: string) => void
  handleSetValue: (e: string) => void
  isErrorVisible: boolean
  variants: string[] | [string, number]
}

export const GeneRegionContent = observer(
  ({
    locusCondition,
    validateValue,
    handleSetValue,
    isErrorVisible,
    variants,
  }: IProps) => {
    return (
      <Fragment>
        <div className="flex justify-between w-full mt-4 text-14">
          <div className="flex">
            <span>{t('dtree.locus')}</span>

            <div className="relative flex ml-2">
              <Input
                value={locusCondition}
                onChange={(e: any) => {
                  validateValue(e.target.value)
                  handleSetValue(e.target.value)
                }}
                className="h-5"
              />

              {isErrorVisible && (
                <div className="absolute -bottom-3 flex items-center mt-1 h-3 text-10 text-red-secondary">
                  {t('dtree.chromosomeNameIsNotCorrect')}
                </div>
              )}
            </div>
          </div>

          <AllNotMods
            isNotModeChecked={
              modalGeneRegionStore.currentMode === ModeTypes.Not
            }
            isNotModeDisabled={variants ? variants.length === 0 : true}
            toggleNotMode={() =>
              modalGeneRegionStore.setCurrentMode(ModeTypes.Not)
            }
          />
        </div>

        <DisabledVariantsAmount
          variants={variants}
          disabled={true}
          isErrorVisible={isErrorVisible}
        />
      </Fragment>
    )
  },
)
