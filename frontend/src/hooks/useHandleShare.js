import { useCallback } from 'react'
import { useModalState } from '../store/useModalState'
import { MODALS } from '@/utils/constants/modals'

export default function useHandleShare() {
  const openModal = useModalState(state => state.openModal)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return useCallback((id) => {
    if (!id) return
    const shareUrl = `${origin}/product/${id}`
    openModal(MODALS.SHARE, { shareUrl })
  }, [origin, openModal])
}