import React, { Fragment, ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'

import { FilterModsEnum } from '@core/enum/filter-mods-enum'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'

export const FilterMods = (): ReactElement => {
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
        <div className="mr-6 flex items-center">
          <Checkbox
            onChange={e =>
              handleCheck(e.target, (e.target.name = FilterModsEnum.NOTMode))
            }
            checked={zoneStore.isModeNOT}
            className="mb-0.5"
          />
          <span className="ml-1 text-12">{t('ds.notMode')}</span>
        </div>

        <div className="mr-6 flex items-center">
          <Checkbox
            onChange={e =>
              handleCheck(
                e.target,
                (e.target.name = FilterModsEnum.VariantsWithNotesOnly),
              )
            }
            checked={zoneStore.isModeWithNotes}
            className="mb-0.5"
          />
          <span className="ml-1 text-12">{t('ds.variantsWithNotesOnly')}</span>
        </div>
      </div>

      <div className="border border-blue-light -mb-1.5" />
    </Fragment>
  )
}
