import { toast, ToastOptions, TypeOptions } from 'react-toastify'

type FixedTypeOptions = Exclude<TypeOptions, 'default'>

export const showToast = (
  content: string,
  typeOption: FixedTypeOptions,
  passedOptions?: ToastOptions,
): void => {
  const defaultOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
  }
  const options = { ...defaultOptions, ...passedOptions }

  toast[typeOption](content, options)
}
