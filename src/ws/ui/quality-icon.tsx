import { ReactElement } from 'react'

import { Box } from '../../ui/box'
import { QualityCircleSvg } from '@icons/quality-circle'
import { RectSvg } from '@icons/rect'

interface Props {
  iconVariant: 'fill-circle' | 'outline-circle' | 'fill-rect' | 'outline-rect'
}
export const QualityIcon = ({ iconVariant }: Props): ReactElement => (
  <Box>
    {iconVariant === 'fill-rect' && <RectSvg isFilled />}
    {iconVariant === 'outline-rect' && <RectSvg isFilled={false} />}
    {iconVariant === 'fill-circle' && <QualityCircleSvg isFilled />}
    {iconVariant === 'outline-circle' && <QualityCircleSvg isFilled={false} />}
  </Box>
)
