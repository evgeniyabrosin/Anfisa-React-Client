import { Fragment, ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import zoneStore from '@store/filterZone'
import { PopperButton } from '@components/popper-button'
import { PopperTableModal } from '@components/popper-table-modal'
import { FilterItemList } from './control-panel-filter-item-list'
import { ControlPanelTitle } from './control-panel-title'
import { FilterTags } from './filter-tags'
import { HeaderTableButton } from './header-table-button'

type FilterItemProps = {
  title: string
}

type ModalProps = {
  close: () => void
  title?: string
}

const ButtonElementEdit = ({ refEl, onClick }: any) => (
  <HeaderTableButton
    text={t('ds.edit')}
    refEl={refEl}
    onClick={onClick}
    noIcon={true}
    className="text-blue-bright"
  />
)

const ButtonElementAdd = ({ refEl, onClick }: any) => (
  <Fragment>
    <HeaderTableButton
      text={t('general.add')}
      refEl={refEl}
      onClick={onClick}
      noIcon={true}
      specialIcon={true}
      className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-bright rounded-lg"
    />
  </Fragment>
)

const ModalElement = observer(({ close, title }: ModalProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    datasetStore.samples.length <= 0 && datasetStore.fetchSamplesZoneAsync()

    if (zoneStore.selectedSamples.length > 0) {
      zoneStore.syncSelectedAndLocalFilters('isSamples')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyAsync = async () => {
    close()

    zoneStore.createSelectedZoneFilter('isSamples')
    datasetStore.addZone(['Has_Variant', zoneStore.selectedSamples])
    await datasetStore.fetchWsListAsync(datasetStore.isXL)

    datasetStore.fetchFilteredTabReportAsync()
    zoneStore.paintSelectedSamples()
  }

  const onClearAll = () => {
    zoneStore.unselectAllSamples('clearAll')
    handleApplyAsync()
  }

  return (
    <PopperTableModal
      title={title}
      searchInputPlaceholder={t('ds.searchFilter')}
      onClose={close}
      searchValue={searchValue}
      onApply={handleApplyAsync}
      onChange={setSearchValue}
      onClearAll={onClearAll}
      className="mt-7"
      isSamples={true}
    >
      <FilterItemList
        items={datasetStore.samples.filter(item =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
        )}
        isSamples={true}
      />
    </PopperTableModal>
  )
})

export const FilterItemSamples = observer(
  ({ title }: FilterItemProps): ReactElement => {
    return (
      <div style={{ minWidth: 75 }}>
        <ControlPanelTitle title={title}>
          {zoneStore.selectedSamples.length > 0 && (
            <PopperButton
              title={title}
              ButtonElement={ButtonElementEdit}
              ModalElement={ModalElement}
            />
          )}
        </ControlPanelTitle>

        <PopperButton
          title={title}
          ButtonElement={ButtonElementAdd}
          ModalElement={ModalElement}
          data={zoneStore.selectedSamples}
          type="add"
        />

        <div
          style={{
            maxHeight: '70%',
            width: 'auto',
            maxWidth: 101,
            minWidth: 50,
          }}
          className="flex justify-between mt-0.4"
        >
          <FilterTags data={zoneStore.selectedSamples} isSamples />
        </div>
      </div>
    )
  },
)
