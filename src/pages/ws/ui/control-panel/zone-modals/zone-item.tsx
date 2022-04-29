import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { PopperButton } from '@components/popper-button'
import { ControlPanelDivider } from '../control-panel-divider'
import { HeaderTableButton } from './components/header-table-button'
import { ZoneTags } from './components/zone-tags'

interface IZoneItemProps {
  title: string
  modalElement: any
  selectedTagsList: string[]
  removeZoneTag: (geneName: string, type: string) => void
  dataTestId?: string
  isLast?: boolean
}

export const ZoneItem = observer(
  ({
    title,
    modalElement,
    selectedTagsList,
    removeZoneTag,
    dataTestId,
    isLast,
  }: IZoneItemProps): ReactElement => {
    const setCoordinatesFromEvent = (event: MouseEvent) => {
      zoneStore.setZoneItemCoordinates(event.clientX - 60, event.clientY - 10)
    }

    const ButtonElementEdit = ({ refEl, onClick }: any) => (
      <HeaderTableButton
        text="+"
        refEl={refEl}
        onClick={onClick}
        className="text-blue-bright mt-px ml-1"
      />
    )

    const ButtonElementAdd = ({ refEl, onClick }: any) => (
      <HeaderTableButton
        text={`${t('general.add')} ${title}`}
        refEl={refEl}
        onClick={onClick}
        noIcon={true}
        className="flex items-center text-14 text-blue-bright"
        dataTestId={dataTestId}
      />
    )

    return (
      <div className="flex items-center">
        <PopperButton
          title={title}
          ButtonElement={ButtonElementAdd}
          ModalElement={modalElement}
          data={selectedTagsList}
          type="add"
          onClick={setCoordinatesFromEvent}
        />

        <div className="flex justify-between">
          <ZoneTags
            selectedTagsList={selectedTagsList}
            title={title}
            removeZoneTag={removeZoneTag}
          />
        </div>

        {toJS(selectedTagsList).length > 0 && (
          <PopperButton
            title={title}
            ButtonElement={ButtonElementEdit}
            ModalElement={modalElement}
            onClick={setCoordinatesFromEvent}
          />
        )}

        {!isLast && <ControlPanelDivider className="bg-blue-lighter h-2/3" />}
      </div>
    )
  },
)
