import { ReactElement } from 'react'

import { Icon } from '@ui/icon'

interface Props {
  iconVariant: 'fill-circle' | 'outline-circle' | 'fill-rect' | 'outline-rect'
}
export const QualityIcon = ({ iconVariant }: Props): ReactElement => (
  <div>
    {iconVariant === 'fill-rect' && <Icon name="Rect" />}
    {iconVariant === 'outline-rect' && (
      <Icon
        name="Rect"
        fill={false}
        stroke={true}
        className="text-transparent border border-black"
      />
    )}
    {iconVariant === 'fill-circle' && <Icon name="Circle" />}
    {iconVariant === 'outline-circle' && <Icon name="Ring" />}
  </div>
)
