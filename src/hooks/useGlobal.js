import { useContext } from 'react'
import { GlobalContext } from 'Global'

export default function useGlobal() {
  return useContext(GlobalContext)
}
