import { useEffect } from 'react'
import { Form, FormikProps } from 'formik'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { Input } from '@ui//input'
export interface IGeneRegionFormValues {
  locus: string
}

export const GeneRegion = ({
  values: { locus },
  setFieldValue,
}: FormikProps<IGeneRegionFormValues>) => {
  const cachedValues = filterStore.readFilterCondition<IGeneRegionFormValues>(
    FuncStepTypesEnum.GeneRegion,
  )

  const locusValue = cachedValues?.locus || locus

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
          Locus
        </span>

        <Input
          value={locusValue}
          onChange={e => {
            setFieldValue('locus', e.target.value)
          }}
        />
      </div>
    </Form>
  )
}
