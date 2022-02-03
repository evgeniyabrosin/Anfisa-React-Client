import { useEffect, useState } from 'react'
import { Form, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Input } from '@ui//input'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { DisabledVariantsAmount } from './query-builder/ui/disabled-variants-amount'

export interface IGeneRegionFormValues {
  locus: string
}

export const GeneRegion = observer(
  ({
    values: { locus },
    setFieldValue,
  }: FormikProps<IGeneRegionFormValues>) => {
    const cachedValues = filterStore.readFilterCondition<IGeneRegionFormValues>(
      FuncStepTypesEnum.GeneRegion,
    )

    const locusValue = cachedValues?.locus || ''
    const { variants } = filterStore.statFuncData

    const [isErrorVisible, setIsErrorVisible] = useState(false)

    const validateValue = (value: string) => {
      validateLocusCondition({ value, setIsErrorVisible })
    }

    useEffect(() => {
      isErrorVisible
        ? filterStore.setError('out of choice')
        : filterStore.setError('')
    }, [isErrorVisible])

    useEffect(() => {
      if (!locusValue) {
        filterStore.setError('out of choice')
      }

      const params = `{"locus":"${locusValue}"}`

      filterStore.fetchStatFuncAsync('GeneRegion', params)

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      filterStore.setFilterCondition<IGeneRegionFormValues>(
        FuncStepTypesEnum.GeneRegion,
        {
          locus,
        },
      )
    }, [locus])

    return (
      <Form>
        <div className="mt-4">
          <span className="text-14 leading-16px text-grey-blue font-bold">
            {'Locus'}
          </span>

          <div className="relative flex">
            <Input
              value={locusValue}
              onChange={e => {
                setFieldValue('locus', e.target.value)
                validateValue(e.target.value)
              }}
            />

            {isErrorVisible && (
              <div className="absolute -bottom-4 flex items-center mt-1 h-3 text-10 text-red-secondary">
                {t('dtree.chromosomeNameIsNotCorrect')}
              </div>
            )}
          </div>

          <DisabledVariantsAmount
            variants={variants}
            disabled={true}
            isErrorVisible={isErrorVisible}
          />
        </div>
      </Form>
    )
  },
)
