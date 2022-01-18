import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
// import get from 'lodash/get'
// import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

// import variantStore from '@store/variant'
import { Routes } from '@router/routes.enum'

export const IgvButton = observer(
  (): ReactElement => {
    // const name = get(toJS(variantStore.variant), '[2].rows[0].cells[1][0]', '')
    // const locus = get(toJS(variantStore.variant), '[0].rows[1].cells[0][0]', '')

    // TODO: use one of several sample name (002/003/004)
    // const sampleList = get(toJS(variantStore.variant), '[2].rows[0].cells', [])

    // const igvVariant = { name, locus }

    // console.log(sampleList)

    return (
      <Link target="_blank" to={Routes.IGV}>
        OPEN IGV
      </Link>
    )
  },
)
