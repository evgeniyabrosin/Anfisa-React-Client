import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { DatasetField } from './dataset-filed'
import dirinfoStore from '../../store/dirinfo'
import get from 'lodash/get'
import { Versions } from '../../..'

const Root = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

export const DatasetsFieldsList = observer((): ReactElement => {
	const versions: Versions = get(dirinfoStore, 'dsinfo.meta.versions', {}) 

	return (
		<Root>
			<DatasetField label="GERP"  value={versions.GERP} />
			<DatasetField label="Annotations"  value={versions.annotations} />
			<DatasetField label="Annotations Date"  value={versions.annotations_date} />
			<DatasetField label="Annotations build"  value={versions.annotations_build} />
			<DatasetField label="bcftools_annotate_version"  value={versions.bcftools_annotate_version} style={{flexBasis: '100%'}} />
			<DatasetField label="gatk"  value={versions.gatk} />
			<DatasetField label="gatk_select_variants"  value={versions.gatk_select_variants} />
			<DatasetField label="Pipeline"  value={versions.pipeline} />
		</Root>
	)
})