import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { TCondition } from '@service-providers/common/common.interface'
import datasetProvider from '@service-providers/dataset-level/dataset.provider'
import { IDsListArguments } from '@service-providers/dataset-level/dataset-level.interface'

export const fetchDsListAsync = async (requestValue: number | TCondition[]) => {
  const params: IDsListArguments = {
    ds: datasetStore.datasetName,
  }

  if (typeof requestValue === 'number') {
    params.code = dtreeStore.dtreeCode
    params.no = String(requestValue)
  } else {
    params.conditions = requestValue
  }

  const dsList = await datasetProvider.getDsList(params)

  return dsList
}
