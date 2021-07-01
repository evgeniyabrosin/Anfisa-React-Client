import { useParams } from './use-params'

export const useVariantIndex = () => {
  const params = useParams()

  const setVariantIndex = (index?: number) => {
    if (window.history.pushState) {
      const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        `?ds=${params.get('ds') ?? ''}${
          Number.isInteger(index) ? `&variantIndex=${index}` : ''
        }`

      window.history.pushState({ path: newurl }, '', newurl)
    }
  }

  return {
    setVariantIndex,
  }
}
