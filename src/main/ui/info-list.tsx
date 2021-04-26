import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { t } from '../../i18n/i18n'
import { Box } from '../../ui/box'
import dirinfoStore from '../../store/dirinfo'
import { get } from 'lodash'
import { Text } from '../../ui/text'
import { useLocation } from 'react-router'

export const InfoList = observer((): ReactElement => {
	const docs = get(dirinfoStore, 'dsinfo.doc', [])

	console.log(dirinfoStore.selectedDirinfoName)

	if (!docs[1]) {
		return <></>
	}

	const handleClick = async (doc: any) => {
		const response = await fetch(`dsdoc/${dirinfoStore.selectedDirinfoName}/${doc[1]}`)
		const resultHTML = await response.text()

		console.log(resultHTML)
	}

	return (
		<Box>
			{docs[1].map((doc: string[]) => {
				if (!doc) {
					return <></>
				}
				console.log(doc[1])
				return <><Text key={Math.random()} onClick={() => handleClick(doc)}>{doc[0]}</Text></>
			})}
		</Box>
	)
})