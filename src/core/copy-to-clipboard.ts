export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')

  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.append(el)
  el.select()
  document.execCommand('copy')
  el.remove()
}
