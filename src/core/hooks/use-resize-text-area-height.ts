import { useEffect } from 'react'

export const useResizeTextAreaHeight = (
  element: HTMLTextAreaElement | null,
): void => {
  const textAreaValue = element?.value

  useEffect(() => {
    if (!element) return

    if (textAreaValue === '') {
      element.style.height = '55px'
      return
    }

    // Reset field height
    element.style.height = 'inherit'

    // Get the computed styles for the element
    const computed = window.getComputedStyle(element)

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      element.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10)

    element.style.height = `${height}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAreaValue])
}
