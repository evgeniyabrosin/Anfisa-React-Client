import { Fragment, ReactElement } from 'react'

import { ANYType } from '../../..'
import { t } from '@i18n'
import { Box } from '@ui/box'
import { InfoTextItem } from './info-text-item'

interface Props {
  data: ANYType[]
  activeName: string
  baseDatasetName?: string
  onClick: (doc: ANYType) => void
}

export const DocsList = ({
  data,
  activeName,
  baseDatasetName,
  onClick,
}: Props): ReactElement => {
  if (!data[1]) {
    return <Fragment />
  }

  return (
    <Fragment>
      {baseDatasetName && (
        <InfoTextItem>
          {t('home.base', {
            name: baseDatasetName,
          })}
        </InfoTextItem>
      )}

      {data[1].map((doc: string[]) => {
        if (!doc) {
          return <Fragment />
        }

        return (
          <Box key={doc[0]}>
            <InfoTextItem
              style={{ paddingLeft: baseDatasetName ? 20 : 10 }}
              onClick={() => onClick(doc)}
              isActive={activeName === doc[0]}
              isTitleBaseInfo={Array.isArray(doc[1])}
              isClickable={!Array.isArray(doc[1])}
            >
              {doc[0]}
            </InfoTextItem>

            {Array.isArray(doc[1]) && (
              <Box>
                {doc[1].map(item => (
                  <InfoTextItem
                    isClickable
                    style={{ paddingLeft: baseDatasetName ? 40 : 30 }}
                    isActive={activeName === item[0]}
                    key={item[0]}
                    onClick={() => onClick(item)}
                  >
                    {item[0]}
                  </InfoTextItem>
                ))}
              </Box>
            )}
          </Box>
        )
      })}
    </Fragment>
  )
}
