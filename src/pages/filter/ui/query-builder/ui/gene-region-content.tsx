import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Input } from '@ui/input'
import { AllNotModalMods } from './all-not-modal-mods'
import { EditModalVariants } from './edit-modal-variants'

interface IProps {
  locusCondition: string
  validateValue: (e: string) => void
  handleSetValue: (e: string) => void
  isErrorVisible: boolean
  variants: [string, number]
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
          <div className="flex h-9">
            <span>{t('dtree.locus')}</span>

            <div className="relative flex h-9 ml-2">
              <Input
                value={locusCondition}
                onChange={(e: any) => {
                  validateValue(e.target.value)
                  handleSetValue(e.target.value)
                }}
                className="h-5"
              />

              {isErrorVisible && (
                <div className="absolute bottom-0 flex items-center h-3 text-10 text-red-secondary">
                  {t('dtree.chromosomeNameIsNotCorrect')}
                </div>
              )}
            </div>
          </div>

          <AllNotModalMods />
        </div>

        <EditModalVariants variants={variants} disabled={true} />
      </Fragment>
    )
  },
)
