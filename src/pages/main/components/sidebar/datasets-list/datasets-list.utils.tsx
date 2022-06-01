import dirinfoStore from '@store/dirinfo'
import { DatasetsListItem } from '@pages/main/components/sidebar/datasets-list/datasets-list-item'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'

export const datasetNameByKey =
  (level: number = 0) =>
  // eslint-disable-next-line react/display-name
  (key: string) => {
    const { dirInfoData } = dirinfoStore

    if (!dirInfoData) return null

    const item: IDirInfoDatasetDescriptor = dirInfoData.dsDict[key]

    if (!level && (!item || item.ancestors.length > 0)) return null

    return <DatasetsListItem item={item} key={item.name} level={level} />
  }
