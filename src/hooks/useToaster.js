import { useContext } from 'react'
import { ToastContext } from 'components/Toaster'

export default function useToaster() {
  return useContext(ToastContext)
}
