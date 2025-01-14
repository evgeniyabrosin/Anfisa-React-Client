import { ReactElement } from 'react'

import { t } from '@i18n'
import { TDocumentDescriptor } from '@service-providers/common'
import { InfoTextItem } from './info-text-item'

interface IDocsListProps {
  data: TDocumentDescriptor | undefined
  activeName: string
  baseDatasetName?: string
  onClick: (doc: any) => void
}

export const DocsList = ({
  data,
  activeName,
  baseDatasetName,
  onClick,
}: IDocsListProps): ReactElement | null => {
  if (data && !data[1]) return null

  return (
    <>
      {baseDatasetName && (
        <InfoTextItem>
          {t('home.base', {
            name: baseDatasetName,
          })}
        </InfoTextItem>
      )}

      {data &&
        data[1].map((doc: string[]) => {
          if (!doc) return null

          return (
            <div key={doc[0]}>
              <InfoTextItem
                className={baseDatasetName ? 'pl-2' : 'pl-2'}
                onClick={() => onClick(doc)}
                isActive={activeName === doc[0]}
                isTitleBaseInfo={Array.isArray(doc[1])}
                isClickable={!Array.isArray(doc[1])}
              >
                {doc[0]}
              </InfoTextItem>

              {Array.isArray(doc[1]) && (
                <div>
                  {doc[1].map(item => (
                    <InfoTextItem
                      isClickable
                      className={baseDatasetName ? 'pl-4' : 'pl-8'}
                      isActive={activeName === item[0]}
                      key={item[0]}
                      onClick={() => onClick(item)}
                    >
                      {item[0]}
                    </InfoTextItem>
                  ))}
                </div>
              )}
            </div>
          )
        })}
    </>
  )
}
