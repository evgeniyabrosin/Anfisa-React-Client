import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'

// import { useParams } from '../../core/hooks/use-params'
// import filterStore from '@store/filter'
import { Box } from '@ui/box'

export const QueryEditor = observer(
  (): ReactElement => {
    // const params = useParams()
    // const [code, setCode] = useState('')

    // const handleChange = (event: any) => {
    //   setCode(event.target.value)
    //   //   filterStore.fetchDtreeSetAsync(params.get('ds') || '', event.target.value)
    // }

    // useEffect(() => {
    //   const initAsync = async () => {
    //     await filterStore.fetchDtreeSetAsync(params.get('ds') || '', code)

    //     const el = document.querySelector('#resultHTML')

    //     if (el) {
    //       const codeFrag = get(filterStore, 'dtreeSet.points[0].code-frag', '')

    //       console.log(codeFrag)
    //       el.innerHTML = codeFrag
    //     }
    //   }

    //   initAsync()
    // }, [code, params])

    return (
      <Box>
        {/* <textarea onChange={handleChange} />

        <div id="resultHTML" /> */}
      </Box>
    )
  },
)
