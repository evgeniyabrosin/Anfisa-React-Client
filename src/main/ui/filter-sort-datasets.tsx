import { ReactElement } from 'react'
import styled from 'styled-components'
import { t } from '../../i18n/i18n'
import { theme } from '../../theme/theme'
import { Box } from '../../ui/box'
import { Input } from '../../ui/input'
import { SortItem } from '../ui/sort-item'
import { SortDatasets } from '../../core/enum/sort-datasets.enum'

const Root = styled(Box)`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`

const SortButtons = styled(Box)`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid ${theme('colors.grey.6')};
`

export const FilterSortDatasets = (): ReactElement => {
	return (
		<Root>
			<Input placeholder={t('home.searchForADataset')}/>

			<SortButtons>
				<SortItem text={t('home.name')} sortType={SortDatasets.Name} />
				<SortItem text={t('home.createdAt')} sortType={SortDatasets.CreatedAt} />
			</SortButtons>
		</Root>
	)
}
