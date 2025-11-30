import { create } from 'zustand';

export const useModalState = create((set) => ({
    centerModal: '',
    openCenterModal: (modal) => set({ centerModal: modal }),
    closeCenterModal: () => set({ centerModal: '' }),

    shareUrl: '',
    setShareUrl: (shareUrl) => set({ shareUrl }),
})); 