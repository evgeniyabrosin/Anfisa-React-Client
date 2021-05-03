import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import { BaseInfoItem } from './base-info-item'

const Root = styled(Box)`
	padding-right: 150px;
`

export const BaseInfo = (): ReactElement => {
	return (
		<Root>
			<BaseInfoItem name={t('variant.genes')} value={'CLCNKB'} />
			<BaseInfoItem name={t('variant.worstAnnotation')} value={'splice_region_variant'} />
			<BaseInfoItem name={t('variant.hg19')} value={'chr1:16378047 G>T'} />
		</Root>
	)
}