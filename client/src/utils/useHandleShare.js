import { useCallback } from 'react'
import { useModalState } from '../store/useModalState'

export default function useHandleShare() {
  const openCenterModal = useModalState(state => state.openCenterModal)
  const setShareUrl = useModalState(state => state.setShareUrl)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return useCallback((id) => {
    if (!id) return
    setShareUrl(`${origin}/product/${id}`)
    openCenterModal('share')
  }, [origin, setShareUrl, openCenterModal])
}