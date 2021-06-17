import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
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
            <Button
              size="xs"
              icon={<Icon name="Arrow" className="transform rotate-90" />}
              className="bg-blue-lighter"
              disabled={!canGetPrevVariant}
              onClick={handlePrevVariant}
            />

            <Button
              size="xs"
              icon={<Icon name="Arrow" className="transform -rotate-90" />}
              className="bg-blue-lighter mx-2"
              onClick={handleNextVariant}
            />

            <div className="text-blue-bright font-bold text-2xl leading-7">{`[${genInfo}] ${hg19}`}</div>
          </div>

          <Icon
            name="Close"
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
