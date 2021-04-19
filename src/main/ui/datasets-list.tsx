import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { Box } from '../../ui/box'
import dirinfoStore from '../../store/dirinfo'
import { DsDistItem } from '../../..'
import { get } from 'lodash'
import { DatasetsListItem } from './datasets-list-item'

export const DatasetsList = observer((): ReactElement => {
	const keys = Object.keys(get(dirinfoStore.dirinfo, 'ds-dict', {}))

	return (
		<Box>
			{keys.map((key) => {
				const item: DsDistItem = dirinfoStore.dirinfo['ds-dict'][key]

				if (item.ancestors.length !== 0) {
					return
				}

				return <DatasetsListItem item={item} key={item.name} />
			})}
		</Box>
	)
})