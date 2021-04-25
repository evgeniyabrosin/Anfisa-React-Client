import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import dirinfoStore from '../../store/dirinfo'
import { get } from 'lodash'
import { Text } from '../../ui/text'

export const InfoList = observer((): ReactElement => {
	const docs = get(dirinfoStore, 'dsinfo.doc', [])

	return (
		<Box>
			{docs.map((doc: string[]) => {
				if (!doc) {
					return <></>
				}

				return <Text key={Math.random()}>{doc[0][0]}</Text>
			})}
		</Box>
	)
})