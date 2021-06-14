import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/variant'
import { ArrowSvg } from '@icons/arrow'
import { CloseSvg } from '@icons/close'
import { Button } from '@ui/button'
import { Tags } from '@ui/tags'
import { closeHandler } from '../drawer'

export const VariantHeader = observer(
  (): ReactElement => {
    const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
    const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')
    const canGetPrevVariant = !!variantStore.index
    const fakeTags = ['Fake Previously Triaged', 'Fake Benign/Likely benign']

    const handlePrevVariant = () => {
      if (!canGetPrevVariant) return
      variantStore.prevVariant()
    }

    const handleNextVariant = () => {
      // TODO add last item check
      variantStore.nextVariant()
    }

    return (
      <div className="p-4 bg-blue-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-blue-bright font-bold text-2xl leading-7">{`[${genInfo}] ${hg19}`}</div>

            <Button
              size="xs"
              icon={<ArrowSvg className="transform rotate-90" />}
              className="bg-blue-lighter ml-3 mr-1"
              disabled={!canGetPrevVariant}
              onClick={handlePrevVariant}
            />

            <Button
              size="xs"
              icon={<ArrowSvg className="transform -rotate-90" />}
              className="bg-blue-lighter"
              onClick={handleNextVariant}
            />
          </div>

          <CloseSvg
            className="cursor-pointer text-white"
            onClick={closeHandler}
          />
        </div>

        {fakeTags.length > 0 && (
          <div className="text-white mt-3 flex items-center">
            <div className="mr-3">{t('general.tags')}</div>
            <Tags tags={fakeTags} />
          </div>
        )}
      </div>
    )
  },
)
