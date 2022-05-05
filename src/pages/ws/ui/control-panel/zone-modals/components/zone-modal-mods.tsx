import React, { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterModsEnum } from '@core/enum/filter-mods-enum'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { Checkbox } from '@ui/checkbox/checkbox'

export const ZoneModalMods = observer((): ReactElement => {
  const handleCheck = (checked: boolean, name: string) => {
    if (checked && name) {
      name === FilterModsEnum.NOTMode && zoneStore.setModeNOT(true)
      name === FilterModsEnum.VariantsWithNotesOnly &&
        zoneStore.setModeWithNotes(true)
    } else if (name) {
      name === FilterModsEnum.NOTMode && zoneStore.setModeNOT(false)
      name === FilterModsEnum.VariantsWithNotesOnly &&
        zoneStore.removeLocalTag('_note', 'slow')
    }
  }

  return (
    <Fragment>
      <div className="flex my-2">
        <Checkbox
          id={'zone-not-mode'}
          className="mr-6 text-12"
          checked={zoneStore.isModeNOT}
          onChange={e =>
            handleCheck(
              e.target.checked,
              (e.target.name = FilterModsEnum.NOTMode),
            )
          }
        >
          {t('ds.notMode')}
        </Checkbox>

        <Checkbox
          id={'zone-notes-mode'}
          className="mr-6 text-12"
          checked={zoneStore.isModeWithNotes}
          onChange={e =>
            handleCheck(
              e.target.checked,
              (e.target.name = FilterModsEnum.VariantsWithNotesOnly),
            )
          }
        >
          {t('ds.variantsWithNotesOnly')}
        </Checkbox>
      </div>
    </Fragment>
  )
})
