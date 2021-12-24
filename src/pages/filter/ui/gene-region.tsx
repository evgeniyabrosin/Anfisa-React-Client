import { Form, FormikProps } from 'formik'

import { SessionStoreManager } from '@core/session-store-manager'
import { Input } from '@ui//input'
import { SessionStoreDataProvider } from '../../../components/session-store-data-provider'
import { FILTER_REFINER_PREFIX } from './filter-refiner'

export interface IGeneRegionFormValues {
  locus: string
}

const GENE_REGION = 'Gene_Region'

const getSavedValues = () => {
  return SessionStoreManager.read<IGeneRegionFormValues>(
    GENE_REGION,
    FILTER_REFINER_PREFIX,
  )
}

export const GeneRegion = ({
  values: { locus },
  setFieldValue,
}: FormikProps<IGeneRegionFormValues>) => {
  const locusValue = locus || getSavedValues()?.locus || ''

  return (
    <SessionStoreDataProvider<IGeneRegionFormValues>
      storeKey={GENE_REGION}
      values={{ locus: locusValue }}
      storePrefix={FILTER_REFINER_PREFIX}
    >
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
    </SessionStoreDataProvider>
  )
}
