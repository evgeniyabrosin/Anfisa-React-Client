import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import { Box } from '../../ui/box'
import dirinfoStore from '../../store/dirinfo'
import { get } from 'lodash'
import { DocsList } from './docs-list'
import { ANYType } from '../../..'

export const InfoList = observer((): ReactElement => {
	const docs = get(dirinfoStore, 'dsinfo.doc', [])
	const baseDatasetName = dirinfoStore.ancestorsDsInfo[0][0]
	
	if (!docs[1]) {
		return <></>
	}

	const handleClick = async (doc: ANYType, isBaseInfo?: boolean) => {
		if (Array.isArray(doc[1])) {
			return
		}

		dirinfoStore.setActiveInfoName(doc[0])

		if (isBaseInfo) {
			dirinfoStore.setInfoFrameLink(`https://anfisa.forome.dev/anfisa/app/dsdoc/${dirinfoStore.ancestorsDsInfo[0][0]}/${doc[1]}`)
			return
		}

		dirinfoStore.setInfoFrameLink(`https://anfisa.forome.dev/anfisa/app/dsdoc/${dirinfoStore.selectedDirinfoName}/${doc[1]}`)
	}

	return (
		<Box>
			<DocsList activeName={dirinfoStore.activeInfoName} data={docs} onClick={handleClick} />

			{dirinfoStore.ancestorsDsInfo[0] && dirinfoStore.ancestorsDsInfo[0][1] && <DocsList activeName={dirinfoStore.activeInfoName} baseDatasetName={baseDatasetName} data={dirinfoStore.ancestorsDsInfo[0][1]} onClick={(doc) => handleClick(doc, true)} />}
		</Box>
	)
})