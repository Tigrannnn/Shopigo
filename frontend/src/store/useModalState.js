import { create } from "zustand";

export const useModalState = create((set) => ({
  activeModal: "",
  modalProps: {},

  openModal: (modalName, props = {}) =>
    set({ activeModal: modalName, modalProps: props }),

  closeModal: () => {

    return set({ activeModal: "", modalProps: {} })
  },
}));
