export const sleep = (timeout: number): Promise<void> =>
  new Promise(resolve => {
    window.setTimeout(resolve, timeout)
  })
