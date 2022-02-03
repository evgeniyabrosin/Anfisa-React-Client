import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import zoneStore from '@store/filterZone'
import { NoResultsFound } from '@components/no-results-found'

const resetTableToInitial = () => {
  filterStore.resetData()
  zoneStore.resetAllSelectedItems()
  datasetStore.clearZone()
  datasetStore.initDatasetAsync()
}

export const renderNoResults = () => {
  const { selectedFilters } = filterStore

  const { selectedGenes, selectedGenesList, selectedSamples, selectedTags } =
    zoneStore

  const isFiltersSelected =
    Object.keys(selectedFilters).length > 0 ||
    selectedGenes.length > 0 ||
    selectedGenesList.length > 0 ||
    selectedSamples.length > 0 ||
    selectedTags.length > 0

  if (
    datasetStore.tabReport.length === 0 &&
    !datasetStore.isFetchingMore &&
    !datasetStore.isLoadingTabReport
  ) {
    return isFiltersSelected ? (
      <NoResultsFound
        text={t('general.noResultsFoundByFilters')}
        className="text-black font-bold"
        action={{
          text: t('general.resetFilters'),
          handler: resetTableToInitial,
        }}
      />
    ) : (
      <NoResultsFound text={t('general.noResultsFound')} />
    )
  } else {
    return null
  }
}
