import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Input } from '@ui/input'
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

          <AllNotMods />
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
