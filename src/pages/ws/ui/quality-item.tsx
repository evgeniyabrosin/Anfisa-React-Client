import { ReactElement } from 'react'

import { QualityIcon } from './quality-icon'

export interface QualityI {
  qualityName: string
  genotype: string
  g_quality: number
}

type Props = QualityI & {
  iconVariant: 'fill-circle' | 'outline-circle' | 'fill-rect' | 'outline-rect'
}

export const QualityItem = ({
  genotype,
  g_quality,
  iconVariant,
  qualityName,
}: Props): ReactElement => (
  <div className="text-10 leading-16px mr-6">
    <div>
      <QualityIcon iconVariant={iconVariant} />
      <div>{qualityName}</div>
      <div>{genotype}</div>
    </div>

    <div>{g_quality}</div>
  </div>
)
