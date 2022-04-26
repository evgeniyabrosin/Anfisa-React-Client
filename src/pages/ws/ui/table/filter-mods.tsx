import React, { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterModsEnum } from '@core/enum/filter-mods-enum'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { Checkbox } from '@ui/checkbox/checkbox'

export const FilterMods = observer((): ReactElement => {
  const handleCheck = (
    target: EventTarget & HTMLInputElement,
    name: string,
  ) => {
    if (target.checked && name) {
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
          className="mr-6 flex items-center text-12"
          checked={zoneStore.isModeNOT}
          onChange={e =>
            handleCheck(e.target, (e.target.name = FilterModsEnum.NOTMode))
          }
        >
          {t('ds.notMode')}
        </Checkbox>

        <Checkbox
          className="mr-6 flex items-center text-12"
          checked={zoneStore.isModeWithNotes}
          onChange={e =>
            handleCheck(
              e.target,
              (e.target.name = FilterModsEnum.VariantsWithNotesOnly),
            )
          }
        >
          {t('ds.variantsWithNotesOnly')}
        </Checkbox>
      </div>

      <div className="border border-blue-light -mb-1.5" />
    </Fragment>
  )
})
